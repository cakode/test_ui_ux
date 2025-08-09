interface CoinRowProps {
    rank: number;
    iconUrl: string;
    name: string;
    symbol: string;
    price: number;
    change7d: number;
    marketCap: number;
    volume: number;
    circulatingSupply: number;
    sparkline: number;
}

const CoinRow = ({}: CoinRowProps) => {

    return (
        <tr>
            
        </tr>
    );
};