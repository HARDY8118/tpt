import tpt from '../src/tpt';
import { join } from 'path';


test("Shopping list", () => {
    const _tpt = new tpt(join(__dirname, "..", "samples", "ShoppingList.json"));
    _tpt.check();
    expect(true).toBe(true);
})

test("Movies", () => {
    const _tpt = new tpt(join(__dirname, "..", "samples", "Movies.json"));
    _tpt.check();
    expect(true).toBe(true);
})
