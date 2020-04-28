import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import auth from '@/api/auth';
import { SignUpType, ProductType, AuditType } from '@/models/enums';
import { emptyProduct } from '@/models/product';
import { getImageUrl, timeAgo } from '@/utils';

Vue.use(Vuex as any);

function getList(payload = [], type: SignUpType) {
  return payload
    .filter(x => x['submitType'] === type)
    .map(item => {
      const i = JSON.parse(item['submitInfo']);
      return {
        ...i,
        submitTime: item['submitTime'],
        userId: item['userId'],
        ex: {
          userInfo: {
            tags: i.tags,
            frontCoverUrl: i.frontCoverUrl,
            bigFrontCoverUrl: i.bigFrontCoverUrl,
            highlights: i.highlights,
            viewpoint: i.viewpoint,
            photoUrl: i.photoUrl,
            life: i.life
          }
        },
        mobile: i.mobilePhone,
        wxNumber: i.wechat,
        userName: i.name
      };
    });
}

function getSignUpInfo(signUpList) {
  const hasData = signUpList && signUpList.length > 0;
  return {
    office: hasData ? getList(signUpList, SignUpType.网点) : [],
    manager: hasData ? getList(signUpList, SignUpType.客户经理) : []
  };
}

function getProduct(payload = [], type: ProductType) {
  return payload
    .filter(x => x['productType'] === type)
    .map(item => {
      return { ...emptyProduct, ...(item as any) };
    });
}

function getProductInfo(productList) {
  const hasData = productList && productList.length > 0;
  return {
    superior: hasData ? getProduct(productList, ProductType.优品) : [],
    promotion: hasData ? getProduct(productList, ProductType.活动) : []
  };
}

function formatComments(payload = []) {
  return payload.map(item => {
    let c = item as any;
    c.realIcon = getImageUrl(c.icon);
    c.releaseTime = timeAgo(c.createTime);
    return c;
  });
}

function getComments(commentsList) {
  const hasData = commentsList && commentsList.length > 0;
  return {
    comments: hasData ? formatComments(commentsList) : []
  };
}

const store = new Vuex.Store({
  state: {
    loading: true,
    list: {
      office: [] as any,
      manager: [] as any,
      superior: [] as any,
      promotion: [] as any,
      comments: [] as any,
      redPacket: []
    },
    item: {
      type: '',
      info: null
    },
    comments: {
      amount: 0,
      subAmount: 0
    },
    selectedOffice: ''
  },
  mutations: {
    initAuditList(state, payload) {
      if (payload[0]) {
        const { office, manager } = getSignUpInfo(payload[0]);
        state.list.office = office;
        state.list.manager = manager;
      }
      if (payload[1]) {
        const { superior, promotion } = getProductInfo(payload[1]);
        state.list.superior = superior;
        state.list.promotion = promotion;
      }
      if (payload[2]) {
        const { comments } = getComments(payload[2]['rows']);
        state.list.comments = comments;
        state.comments.amount = payload[2]['amount'];
        state.comments.subAmount = payload[2]['subAmount'];
      }
      if (payload[3]) {
        state.list.redPacket = payload[3];
        console.log('red packet :', payload[3]);
      }
    },

    initOffice(state, payload) {
      if (payload) {
        state.selectedOffice = payload;
      }
    },

    initAuditItem(state, payload) {
      state.item = payload;
    },

    emptyAuditItem(state) {
      state.item = {
        type: '',
        info: null
      };
    },

    clean(state) {
      state.list.office = [];
      state.list.manager = [];
      state.list.superior = [];
      state.list.promotion = [];
      state.list.comments = [];
      state.item.type = '';
      state.item.info = null;
      state.comments.amount = 0;
      state.comments.subAmount = 0;
    },

    setSelectedOffice(state, payload) {
      state.selectedOffice = payload;
    }
  },
  actions: {
    initAuditList({ state, commit }) {
      state.loading = true;
      const promiseList = Array<Promise<any>>();
      promiseList.length = 4;
      if (auth.isBranch || auth.isOffice) {
        promiseList[0] = service.auditSignUpInfo();
      }
      if (auth.isBranch) {
        const office = state.selectedOffice;
        promiseList[1] = service.auditProducts(office);
        promiseList[3] = service.getRedAuditList();
      }
      if (auth.isManager) {
        promiseList[2] = service.commentCheckList({});
      }

      return Promise.all(promiseList).then(data => {
        state.loading = false;
        commit('initAuditList', data);
      });
    },

    async moreComments({ state }, payload) {
      const data = await service.commentCheckList(payload);
      const ar = data.rows.map(c => {
        c.realIcon = getImageUrl(c.icon);
        c.releaseTime = timeAgo(c.createTime);
        return c;
      });
      state.list.comments = [...state.list.comments, ...ar];
      state.comments.amount = data.amount;
      state.comments.subAmount = data.subAmount;
    },

    async initAuditItem({ state, commit }, payload) {
      // console.log('audit store', payload);
      return new Promise(async function(resolve) {
        if (
          payload.type === AuditType.Superior ||
          payload.type === AuditType.Promotion
        ) {
          payload.info = await service.productDetail({
            productId: payload.info.productId
          });
        } else if (payload.type === AuditType.RedPacket) {
          payload.info = await service.getAuditRedInfo(payload.info.packetId);
        }
        commit('initAuditItem', payload);
        resolve();
      });
    },

    async checkComment({ commit, state }, payload) {
      await service.checkComment(payload);
    },

    audit({ state, commit }, payload) {
      let audit;
      switch (+state.item.type) {
        case AuditType.Promotion:
        case AuditType.Superior: {
          audit = service.auditProduct({
            ...payload,
            productId: state.item.info!['product']['productId']
          });
          break;
        }
        case AuditType.Manager:
        case AuditType.Office: {
          audit = service.audit({
            ...payload,
            distUserId: state.item.info!['userId']
          });
          break;
        }
        case AuditType.RedPacket: {
          audit = service.auditRedPacket({
            ...payload,
            packetId: state.item.info!['packet']['packetId'],
          });
          break;
        }
        default:
          break;
      }

      return new Promise((resolve, reject) => {
        audit.then(data => {
          commit('emptyAuditItem');
          resolve(true);
        });
      });
    }
  }
});

export default store;
