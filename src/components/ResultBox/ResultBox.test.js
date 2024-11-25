import { render, screen, cleanup } from "@testing-library/react";
import ResultBox from "./ResultBox";
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  
  //PLN to USD
  const testCasesPLNToUSD = [
    { amount: 100, result: '$28.57'},
    { amount: 13, result: '$3.71'},
    { amount: 234, result:'$66.86'},
    { amount: 150, result: '$42.86'},
  ];

  for(const testPLNToUSD of testCasesPLNToUSD){
    it('should render proper info about conversion when PLN -> USD', () => {
      //render component
      render(<ResultBox from='PLN' to='USD' amount={testPLNToUSD.amount} />);

      //find result
      const resultBox = screen.getByTestId('result-box');

      expect(resultBox).toHaveTextContent(`PLN ${testPLNToUSD.amount}.00 = ${testPLNToUSD.result}`);
      cleanup();
    });
  }

  //USD to PLN
  const testCasesUSDToPLN = [
    { amount: 111, result: '388.50'},
    { amount: 43, result: '150.50'},
    { amount: 345, result:'1,207.50'},
    { amount: 279, result: '976.50'},
  ];

  for(const testUSDToPLN of testCasesUSDToPLN){
    it('should render proper info about conversion when USD -> PLN', () => {
      //render component
      render(<ResultBox from='USD' to='PLN' amount={testUSDToPLN.amount} />);

      //find result
      const resultBox = screen.getByTestId('result-box');

      expect(resultBox).toHaveTextContent(`$${testUSDToPLN.amount}.00 = PLN ${testUSDToPLN.result}`);
      cleanup();
    });
  }

  //converting the same currency
  const testTheSameCurrency = [
    { amount: 160, from: 'PLN', to: 'PLN', result: '160'},
    { amount: 88, from: 'PLN', to: 'PLN', result: '88'},
    { amount: 450, from: 'PLN', to: 'PLN', result:'450'},
    { amount: 99, from: 'USD', to: 'USD', result: '99'},
    { amount: 156, from: 'USD', to: 'USD', result: '156'},
    { amount: 555, from: 'USD', to: 'USD', result: '555'},
  ];

  for(const theSame of testTheSameCurrency){
    it('should render proper info about conversion when USD -> USD or PLN -> PLN', () => {
      //render component
      render(<ResultBox from={theSame.from} to={theSame.to} amount={theSame.amount} />);

      //find result
      const resultBox = screen.getByTestId('result-box');

      if(theSame.from === 'PLN'){
        expect(resultBox).toHaveTextContent(`PLN ${theSame.amount}.00 = PLN ${theSame.result}`);
      } else {
        expect(resultBox).toHaveTextContent(`$${theSame.amount}.00 = $${theSame.result}`);
      }

      cleanup();
    });
  }
});
