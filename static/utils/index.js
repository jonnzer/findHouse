let allUtils = {};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
allUtils.GB2312UnicodeConverter = {
    ToUnicode: function (str) {
        var txt = escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
        return txt.replace(/%7b/gi, '{').replace(/%7d/gi, '}').replace(/%3a/gi, ':').replace(/%2c/gi, ',').replace(/%27/gi, '\'').replace(/%22/gi, '"').replace(/%5b/gi, '[').replace(/%5d/gi, ']').replace(/%3D/gi, '=').replace(/%20/gi, ' ').replace(/%3E/gi, '>').replace(/%3C/gi, '<').replace(/%3F/gi, '?').replace(/%5c/gi, '\\');
    }
    , ToGB2312: function (str) {
        return unescape(str.replace(/\\u/gi, '%u'));
    }
};
allUtils.unicodeToCn = function(text){ // unicode转中文
    text = text.trim();
    return this.GB2312UnicodeConverter.ToGB2312(text);
};

allUtils.CnToUnicode = function(text){ // 中文转unicode
    text = text.trim();
    return this.GB2312UnicodeConverter.ToUnicode(text);
};

