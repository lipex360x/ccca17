import crypto from "crypto";

export class Id {
  private value: string

  constructor() {
    this.value = crypto.randomUUID()
  }

  getValue() {
    return this.value
  }
}