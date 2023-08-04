
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ProcessEnum {
    Add = "Add",
    Remove = "Remove"
}

export interface CreateUserInput {
    email?: Nullable<string>;
    name?: Nullable<string>;
}

export interface PunishmentProcessorInput {
    email: string;
    proccesType: ProcessEnum;
    count: number;
}

export interface IQuery {
    getUser(email?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface UserProperties {
    name?: Nullable<string>;
    email?: Nullable<string>;
    canDisplay?: Nullable<boolean>;
    isDeleted?: Nullable<boolean>;
    canDelete?: Nullable<boolean>;
    createdBy?: Nullable<string>;
    updatedAt?: Nullable<string>;
    createdAt?: Nullable<string>;
}

export interface User {
    id?: Nullable<number>;
    labels?: Nullable<Nullable<string>[]>;
    properties?: Nullable<UserProperties>;
    punishment?: Nullable<Punishment>;
}

export interface Punishment {
    id?: Nullable<number>;
    labels?: Nullable<Nullable<string>[]>;
    properties?: Nullable<PunishmentProperties>;
}

export interface PunishmentProperties {
    name?: Nullable<string>;
    count?: Nullable<number>;
    emailSendCount?: Nullable<number>;
    canDisplay?: Nullable<boolean>;
    isDeleted?: Nullable<boolean>;
    canDelete?: Nullable<boolean>;
    createdBy?: Nullable<string>;
    updatedAt?: Nullable<string>;
    createdAt?: Nullable<string>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    createUserFromJson(): Nullable<string> | Promise<Nullable<string>>;
    punishmentProcessor(punishmentProcessorInput?: Nullable<PunishmentProcessorInput>): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
