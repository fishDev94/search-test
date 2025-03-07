import { Contact } from "../../types";
import Card from "../UI/Card/Card";

export default function ResultList({data = []}: {data?: Contact[]}) {

    return (
        <div>
            test result
            <Card />
            {data.map((item, idx) => (
                <div key={idx}>{item.name}</div>
            ))}
        </div>
    )
}