export class Cpf {
  private value: string
  private CPF_LENGTH = 11;
  private FACTOR_FIRST_DIGIT = 10;
  private FACTOR_SECOND_DIGIT = 11;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid CPF')
    this.value = this.removeMask(value)
  }

  public getValue() {
    return this.value
  }

  private validate(value: string) {
    if (!value) return false
    const cpf = this.removeMask(value)
    if (!this.isValidLength(cpf)) return false
    if (this.allEqualDigits(cpf)) return false
    return this.mountCheckDigit(cpf) === this.extractCheckDigit(cpf)
  }

  private removeMask(value: string) {
    return value.replace(/[^0-9]/g, '')
  }

  private isValidLength(value: string) {
    return value.length === this.CPF_LENGTH
  }

  private allEqualDigits(value: string) {
    return value.split('').every((digit) => digit === value[0])
  }

  private mountCheckDigit(value: string) {
    const calculateCheckDigit1 = this.calculateCheckDigit(value, this.FACTOR_FIRST_DIGIT)
    const calculateCheckDigit2 = this.calculateCheckDigit(value, this.FACTOR_SECOND_DIGIT)
    return `${calculateCheckDigit1}${calculateCheckDigit2}`
  }

  private calculateCheckDigit(value: string, counter: number) {
    let total = 0
    for (const digit of value) {
      if (counter === 1) break
      const numericDigit = parseInt(digit)
      total += numericDigit * counter
      counter--
    }
    const rest = total % this.FACTOR_SECOND_DIGIT
    return rest < 2 ? 0 : this.FACTOR_SECOND_DIGIT - rest
  }

  private extractCheckDigit(value: string) {
    return value.slice(9)
  }
}