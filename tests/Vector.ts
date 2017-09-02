import { Vector } from "../src/Vector";
import { HashMap } from "../src/HashMap";
import * as assert from 'assert'

describe("Vector creation", () => {
    it("creates from a JS array", () => assert.deepEqual(
        ["a","b", "c"],
        Vector.ofArray<string>(["a","b","c"]).toArray()));
    it("creates from a spread", () => assert.deepEqual(
        ["a","b", "c"],
        Vector.of("a","b","c").toArray()));
    it("creates also with nulls", () => assert.deepEqual(
        [1, null, 2], Vector.of(1, null, 2).toArray()));
});

describe("Vector manipulation", () => {
    it("appends correctly", () => assert.ok(
        Vector.ofArray<number>([1,2,3,4]).equals(Vector.of(1,2,3).append(4))));
    it("appendAll works", () => assert.ok(
        Vector.of(1,2,3,4).equals(Vector.of(1,2).appendAll(Vector.of(3,4)))));
    it("map works", () => assert.ok(
        Vector.of(5,6,7).equals(Vector.of(1,2,3).map(x=>x+4))));
    it("groupBy works", () => assert.ok(
        HashMap.empty().put(0, Vector.of(2,4)).put(1, Vector.of(1,3))
            .equals(Vector.of(1,2,3,4).groupBy(x => x%2))));
    it("filter works", () => assert.ok(
        Vector.of(2,4)
            .equals(Vector.of(1,2,3,4).filter(x => x%2 === 0))));
    it("sorting works", () => assert.ok(
        Vector.of(4,3,2,1)
            .equals(Vector.of(1,2,3,4).sortBy((x,y) => y-x))));
    it("flatMap works", () => assert.ok(
        Vector.of(1,2,2,3,3,3,4,4,4,4)
            .equals(Vector.of(1,2,3,4).flatMap(
                x => Vector.ofArray(Array.from(Array(x), ()=>x))))));
    it("mkString works", () => assert.equal(
        "1, 2, 3", Vector.of(1,2,3).mkString(", ")));
});

describe("Prepend", () => {
    const basic = Vector.of(1,2,3,4);
    const prepended = Vector.of(2,3,4).prepend(1);
    it("prepends correctly", () => assert.ok(basic.equals(prepended)));
    it("converts to array correctly", () => assert.deepEqual(
        basic.toArray(), prepended.toArray()));
    it("appends correctly after prepend", () => assert.ok(
        basic.append(5).equals(prepended.append(5))));
    it("appendsAll correctly after prepend", () => assert.ok(
        basic.appendAll(Vector.of(5,6)).equals(prepended.appendAll(Vector.of(5,6)))));
    it("converts to string correctly after prepend", () => assert.equal(
        basic.toString(), prepended.toString()));
});

describe("Vector iteration", () => {
    it("calls forEach correctly", () => {
        let ar: number[] = [];
        Vector.of(1,2,3).forEach((v:number) => ar.push(v));
        assert.deepEqual([1,2,3], ar);
    });
    it("finds items", () => 
       Vector.of(1,2,3).find(x => x >= 2).contains(2));
    it("doesn't find if the predicate doesn't match", () => 
       Vector.of(1,2,3).find(x => x >= 4).isNone());
    it("foldsLeft correctly", () => assert.equal(
        "cba!",
        Vector.of("a", "b", "c").foldLeft("!", (xs,x) => x+xs)));
    it("foldsRight correctly", () => assert.equal(
        "!cba",
        Vector.of("a", "b", "c").foldRight("!", (x,xs) => xs+x)));
})

describe("Vector Value tests", () => {
    it("serializes to string correctly", () => assert.equal(
        "[1, 2, 3]", Vector.of(1,2,3).toString()));
    it("has non-obviously-broken equals", () => assert.ok(
        Vector.of("a","b","c").equals(Vector.of("a", "b", "c"))));
})