declare const utils: any;
declare type SymbolArray = {
    symbol: string;
    isArray: true;
    index: number;
};
declare type SymbolObject = {
    symbol: string;
    isArray: false;
    index?: never;
};
declare type JPathSymbol = SymbolArray | SymbolObject;
declare function parseJPath(jPath: string): Array<JPathSymbol>;
declare type Primitive = string | number | boolean | null;
declare function parametersCheck(jPath: string, obj: any, value: Primitive): void;
declare function objectBuilder(jPath: string, obj: any, value: Primitive): any;
