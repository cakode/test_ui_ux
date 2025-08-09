import type { Cryptocurrency } from "../../../types/types";

interface CoinListItemProps {
    cryptocurrency: Cryptocurrency;
}

const CoinListItem = ({ cryptocurrency }: CoinListItemProps) => {
    return (
        <tr>
            <td></td>
        </tr>
    );
};

export default CoinListItem;