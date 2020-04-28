// https://github.com/slavik57/enum-values/blob/master/src/enumValues.ts

export type EnumValueType = string | number;

export class EnumValues {
  /**
   * 枚举类型转换为数组
   * @param e 枚举类型
   * @example
   *  EnumValues.getNames(NumericEnum);
   * @returns
   *  [
   *    { name: 'NAME1', value: 0 },
   *    { name: 'NAME2', value: 1 }
   *  ]
   */
  static getNamesAndValues<T extends EnumValueType>(
    e: any
  ): { name: string; value: T }[] {
    return this.getNames(e).map(_name => {
      return { name: _name, value: e[_name] as T };
    });
  }

  /**
   * 获取枚举类型的名称数组
   * @param e 枚举类型
   * @example
   *  EnumValues.getNames(NumericEnum);
   * @returns
   *  ['NAME1', 'NAME2']
   */
  static getNames(e: any): string[] {
    return Object.keys(e).filter(key => isNaN(+key));
  }

  /**
   * 根据枚举值获取枚举名称
   * @param e 枚举类型
   * @param value 枚举值
   * @example
   *  EnumValues.getNameFromValue(NumericEnum, NumericEnum.NAME1);
   * @returns
   *  'NAME1'
   */
  static getNameFromValue<T extends EnumValueType>(
    e: any,
    value: T
  ): string | null {
    const all = this.getNamesAndValues(e).filter(pair => pair.value === value);
    return all.length === 1 ? all[0].name : null;
  }

  /**
   * 获取枚举的值数组
   * @param e 枚举类型
   * @example
   *   EnumValues.getValues(StringEnum);
   * @returns
   *  [0, 1]
   */
  static getValues<T extends EnumValueType>(e: any): T[] {
    return this.getNames(e).map(name => e[name]) as T[];
  }
}

// Also re-export as ES-2015 default export
export default EnumValues;
