import React, { useState, useEffect } from "react";

export default function CurrencyConverter() {
    const [data, setData] = useState(null);
    const [selection1, setSelection1] = useState("USD");
    const [selection2, setSelection2] = useState("INR");
    const [input1, setInput1] = useState(0);
    const [input2, setInput2] = useState(0);
    const [symbolArray, setSymbolArray] = useState(null);
    const [valueArray, setValueArray] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await fetch("http://api.exchangeratesapi.io/v1/latest?access_key=985e002b0db057e57f8a4e8ea0bb32e7&base=");
            let data = await res.json();
            setData(data.rates);
            setValueArray(Object.values(data.rates));
            setSymbolArray(Object.keys(data.rates));
        })();
    }, [input1, selection1, input2, selection2]);

    const inputRates1 = (e) => {
        e.preventDefault();
        let inp1 = e.target.value;
        setInput1(inp1);
        if (inp1 < 0 || inp1 === "-") return;

        let currency1 = valueArray[symbolArray.indexOf(selection1)];
        let euro = inp1 / currency1;
        let total = euro * valueArray[symbolArray.indexOf(selection2)];
        total = total.toFixed(2);
        setInput2(total);
    };
    const inputRates2 = (e) => {
        e.preventDefault();
        let inp2 = e.target.value;
        setInput2(inp2);
        if (inp2 < 0 || inp2 === "-") return;

        let currency2 = valueArray[symbolArray.indexOf(selection2)];
        let euro = inp2 / currency2;
        let total = euro * valueArray[symbolArray.indexOf(selection1)];
        total = total.toFixed(2);
        setInput1(total);
    };
    const slectionChangeOne = (e) => {
        e.preventDefault();
        setSelection1(e.target.value);
        let sel1 = e.target.value;
        let currency1 = valueArray[symbolArray.indexOf(selection2)];
        let euro = input2 / currency1;
        let total = euro * valueArray[symbolArray.indexOf(sel1)];
        total = total.toFixed(2);
        setInput1(total);
    };

    const slectionChangeTwo = (e) => {
        e.preventDefault();
        setSelection2(e.target.value);
        let sel2 = e.target.value;
        let currency1 = valueArray[symbolArray.indexOf(selection1)];
        let euro = input1 / currency1;
        let total = euro * valueArray[symbolArray.indexOf(sel2)];
        total = total.toFixed(2);
        setInput2(total);
    };

    return (
        <div className="currency_box">
            {/* {console.log(symbolArray)} */}
            <h1>{"Currency Converter"}</h1>
            <div>
                <div className="center flex_box">
                    <select onChange={slectionChangeOne} className="ma3" type="number" value={selection1}>
                        {symbolArray
                            ? symbolArray.map((sym) => {
                                  if (sym !== selection2) {
                                      return (
                                          <option key={sym} value={sym}>
                                              {sym}
                                          </option>
                                      );
                                  }
                              })
                            : ""}
                    </select>
                    <input onChange={inputRates1} className="ma3" type="text" value={input1} />
                </div>
                <div className="center">
                    <select onChange={slectionChangeTwo} className="ma3" type="number" value={selection2}>
                        {symbolArray
                            ? symbolArray.map((sym) => {
                                  if (sym !== selection1) {
                                      return (
                                          <option key={sym} value={sym}>
                                              {sym}
                                          </option>
                                      );
                                  }
                              })
                            : ""}
                    </select>
                    <input onChange={inputRates2} className="ma3" type="text" value={input2} />
                </div>
            </div>
        </div>
    );
}
