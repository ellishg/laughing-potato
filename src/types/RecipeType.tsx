import IngredientType from './IngredientType';

class RecipeType {
    readonly title: string;
    readonly description: string;
    readonly images: string[];
    readonly ingredients: IngredientType[];
    readonly directions: string[];

    constructor(title: string,
                description: string,
                images: string[], ingredients:
                IngredientType[],
                directions: string[]) {
        this.title = title;
        this.description = description;
        this.images = images;
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
            && (
                !('images' in recipe)
                || (
                    (Array.isArray(recipe.images))
                    && (recipe.images.every((image: any) => typeof image == 'string'))
                )
            )
            && ingredients?.every((ingredient?: IngredientType) => ingredient)
            && ('directions' in recipe)
        );
        return (
            isValid ? new RecipeType(recipe.title,
                recipe.description,
                recipe.images || [],
                ingredients!,
                recipe.directions)
                : null
        );
    }
}

export default RecipeType;