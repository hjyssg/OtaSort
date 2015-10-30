var assert = require('assert');
var parser = require("../lib/nameParser")

describe('name parser', function() {
    
   var s1;
   var result;
  describe('parser.parse', function () {
    it('find names', function () {

        s1 = null;
        result = parser.parse(s1);
        assert.ok(result === null);

        s1 = "no thing";
        result = parser.parse(s1);
        assert.ok(result === null);

        s1 = "[真珠貝] apple  .zip";
        result = parser.parse(s1);
        assert.equal(result.author.name, "真珠貝");
        assert.equal(result.title, "apple");
        assert.ok(!result.isDoujin);
    });

    it("find name2", function(){

        s1 = "(DOUJIN)(C82) [真珠貝 (武田弘光)] apple (cake).zip";
        result = parser.parse(s1);
        assert.equal(result.title, "apple");
        assert.equal(result.tag, "cake");
        assert.equal(result.author.group, "真珠貝");
        assert.equal(result.author.name, "武田弘光");
        assert.deepEqual(result.extra, ["DOUJIN","C82"]);
        assert.ok(result.isDoujin);

        s1 = "(COMIC1☆9) [橘花屋 (上杉響士郎, 榊ゆいの)] すみません。 (アイドルマスター シンデレラガールズ).zip";
        result = parser.parse(s1);
        assert.equal(result.title, "すみません。");
        assert.equal(result.tag, "アイドルマスター シンデレラガールズ");
        assert.equal(result.author.group, "橘花屋");
        assert.equal(result.author.name, "上杉響士郎, 榊ゆいの");
        assert.deepEqual(result.extra, ["COMIC1☆9"]);
        assert.ok(result.isDoujin);

    })

  });
});