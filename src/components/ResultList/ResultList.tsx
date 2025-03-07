import { Contact } from "../../types";
import Card from "../UI/Card/Card";

export default function ResultList({data = []}: {data?: Contact[]}) {

    const printResults = () => { 
        return data.map((item, idx) => (
            <div key={idx}>{item.name}</div>
        ))
    }

    return (
        <div>
            <Card />
            {printResults()}
        </div>
    )
}