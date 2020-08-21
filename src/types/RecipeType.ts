import { IngredientType } from './IngredientType';

export class RecipeType {
    readonly title: string;
    readonly description: string;
    readonly ingredients: IngredientType[];
    readonly directions: string[];

    constructor(title: string, description: string, ingredients: IngredientType[], directions: string[]) {
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.directions = directions;
    }

    static get(recipe: any): RecipeType | null {
        const ingredients = recipe.ingredients?.map((ingredient: any) =>
            IngredientType.get(ingredient)
        );
        const isValid = (
            ('title' in recipe)
            && ('description' in recipe)
            && ingredients?.every((ingredient?: IngredientType) => ingredient)
            && ('directions' in recipe)
        );
        return (
            isValid ? new RecipeType(recipe.title,
                recipe.description,
                ingredients!,
                recipe.directions)
                : null
        );
    }
}