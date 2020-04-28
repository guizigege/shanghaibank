/**
 * Storage 常用方法
 */
class Storage {
  /**
   * 在本地缓存中指定 key 存储数据
   * @param key 本地缓存的 key
   * @param value 需要存储的内容
   * @param expiration 过期时间
   * @example
   *  store.set('userinfo',{  username: 'name'});
   */
  set(key, value, expiration?) {
    const entity = {
      timestamp: this.timestamp,
      expiration,
      key,
      value
    };
    wx.setStorageSync(key, JSON.stringify(entity));
    return this;
  }

  /**
   * 从本地缓存中获取指定 key 的数据(若设置过期时间, 则直接返回值，否则返回未过期的值)
   * @param key 本地缓存的 key
   * @example
   *  store.get('userinfo');
   */
  get(key) {
    let entity;
    try {
      entity = wx.getStorageSync(key);
      if (entity) {
        entity = JSON.parse(entity);
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }

    // 若未设置过期时间, 则直接返回值
    if (!entity.expiration) return entity.value;

    // 已过期
    if (this.isExpired(entity)) {
      this.remove(key);
      return null;
    } else {
      return entity.value;
    }
  }

  /**
   * 从本地缓存中删除指定 key 的值
   * @param key 本地缓存中 key
   * @example
   *  store.remove('userinfo');
   */
  remove(key) {
    try {
      wx.removeStorageSync(key);
    } catch (err) {
      console.error(err);
    }
    return this;
  }

  /**
   * 清除所有本地缓存的数据
   * @example
   *  store.remove();
   */
  clear() {
    try {
      wx.clearStorageSync();
    } catch (err) {
      console.error(err);
    }
    return this;
  }

  /**
   * 获取本地缓存的所有信息
   * @example
   *  store.info
   */
  get info() {
    let info = {};

    try {
      info = wx.getStorageInfoSync();
    } catch (err) {
      console.error(err);
    }

    return info || {};
  }

  /**
   * 获取本地缓存数据的数量
   * @example
   *  store.length
   */
  get length(): number {
    return (this.info['keys'] || []).length;
  }

  private get timestamp() {
    return new Date().getTime() / 1000;
  }

  private isExpired(entity) {
    if (!entity) return true;
    return this.timestamp - (entity.timestamp + entity.expiration) >= 0;
  }
}

export default new Storage();
