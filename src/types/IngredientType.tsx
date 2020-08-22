class IngredientType {
  readonly name: string;
  private amount: number;
  private unit?: string;

  constructor(name: string, amount: number, unit?: string) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }

  static get(ingredient: any): IngredientType | null {
    const isValid = (
      ('name' in ingredient) && (typeof ingredient.name == 'string')
      && ('amount' in ingredient) && (typeof ingredient.amount == 'number')
      && (!('unit' in ingredient) || (typeof ingredient.unit == 'string'))
    );
    return (
      isValid ? new IngredientType(ingredient.name,
        ingredient.amount,
        ingredient.unit)
        : null
    );
  }

  getAmount(unitConversions: any, useMetricUnits: boolean): string {
    const unitToAbbreviation: Map<string, string> = new Map([
      ['grams', 'g'],
      ['tablespoons', 'tbsp.'],
      ['teaspoons', 'tsp.'],
      ['ounces', 'oz'],
    ]);

    if (!this.unit) {
      return this.toNearestFraction(this.amount);
    } else {
      var amount = this.amount;
      var unit = this.unit;
      if (this.name in unitConversions) {
        const { cups, grams } = unitConversions[this.name];
        if (useMetricUnits && unit === 'cups') {
          amount = amount * grams / cups;
          unit = 'grams';
        } else if (!useMetricUnits && unit === 'grams') {
          amount = amount * cups / grams;
          unit = 'cups';
        }
      }
      return `${this.toNearestFraction(amount)} ${unitToAbbreviation.get(unit) || unit}`;
    }
  }

  private toNearestFraction(x: number): string {
    const epsilon = 0.001;
    const whole = Math.trunc(x + epsilon);
    const part = x - whole;
    const fraction = (part < (1 / 8) / 2) ? null
      : (part < 1 / 8 + (1 / 4 - 1 / 8) / 2) ? '1/8'
        : (part < 1 / 4 + (1 / 3 - 1 / 4) / 2) ? '1/4'
          : (part < 1 / 3 + (3 / 8 - 1 / 3) / 2) ? '1/3'
            : (part < 3 / 8 + (1 / 2 - 3 / 8) / 2) ? '3/8'
              : (part < 1 / 2 + (5 / 8 - 1 / 2) / 2) ? '1/2'
                : (part < 5 / 8 + (2 / 3 - 5 / 8) / 2) ? '5/8'
                  : (part < 2 / 3 + (3 / 4 - 2 / 3) / 2) ? '2/3'
                    : (part < 3 / 4 + (7 / 8 - 3 / 4) / 2) ? '3/4'
                      : '7/8';
    return whole === 0 ? (fraction ? fraction : '0')
      : `${whole}` + (fraction ? ` ${fraction}` : '');
  };
}

export default IngredientType;