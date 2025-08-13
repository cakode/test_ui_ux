import type { Cryptocurrency } from "../../../types/types";

interface CryptoListItemProps {
    cryptocurrency: Cryptocurrency;
}

const CryptoListItem = ({ cryptocurrency }: CryptoListItemProps) => {
    return (
        <tr>
            <td></td>
        </tr>
    );
};

export default CryptoListItem;