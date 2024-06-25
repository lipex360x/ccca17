import { CarPlate } from "@/vo/CarPlate";
import { Cpf } from "@/vo/Cpf";
import { Email } from "@/vo/Email";
import { Id } from "@/vo/Id";
import { Name } from "@/vo/Name";

export class Account {
  
  private constructor(
    readonly accountId: string,
    readonly name: Name,
    readonly email: Email,
    readonly cpf: Cpf,
    readonly carPlate: string,
    readonly isPassenger: boolean,
    readonly isDriver:  boolean,
    readonly password: string
  ) {}

  static create (
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    isPassenger: boolean,
    isDriver: boolean,
    password: string
  ){
    const id = new Id()
    const plate = isDriver ? new CarPlate(carPlate).getValue() : ''
    return new Account(id.getValue(), new Name(name), new Email(email), new Cpf(cpf), plate, isPassenger, isDriver, password)
  }

  static restore (
    id: string,
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    isPassenger: boolean,
    isDriver: boolean,
    password: string
  ){
    return new Account(id, new Name(name), new Email(email), new Cpf(cpf), carPlate, isPassenger, isDriver, password)
  }
}
