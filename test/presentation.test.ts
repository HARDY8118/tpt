import tpt from '../src/tpt';
import { join } from 'path';

const _testPresentation = new tpt(join(__dirname, "..", "samples", "ShoppingList.json"));

test("Shopping list", () => {
    _testPresentation.check();
    expect(true).toBe(true);
})
