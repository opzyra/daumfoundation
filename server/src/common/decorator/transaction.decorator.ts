/* eslint-disable */
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

export interface SequelizeOptions {
  transaction?: Transaction;
  raw?: boolean;
}

export const Transactional = (): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const instance = this;
      const sequelize = instance.sequelize as Sequelize;
      const transaction = await sequelize.transaction();
      try {
        const returnValue = await originalMethod.apply(this, [
          ...args,
          transaction,
        ]);
        await transaction.commit();
        return returnValue;
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    };

    return descriptor;
  };
};
