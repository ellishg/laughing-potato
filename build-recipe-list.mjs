import fs from 'fs';
import YAML from 'yaml';

const recipe_filenames = await fs.promises.readdir('urban-bassoon/recipes');

const recipes = await Promise.all(recipe_filenames.map(async filename => {
    const buffer = await fs.promises.readFile('urban-bassoon/recipes/' + filename);
    const recipe = YAML.parse(buffer.toString());
    return {
        'filename': filename,
        'title': recipe.title,
        'tags': recipe.tags || [],
    };
}));

await fs.promises.writeFile('public/recipe-list.json', JSON.stringify(recipes));
