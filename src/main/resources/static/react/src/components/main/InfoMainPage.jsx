import {differences} from "../../resources/text/main/differences.js"
import InfoSection from "../InfoSection.jsx";

export default function InfoMainPage() {

    return (
        <section>
            <div className="information-container">
                <div className="information-container-sections">
                    {differences.map(difference => <InfoSection className={"information-container-section"}
                                                                key={difference.title}
                                                                description={difference.description}/> )}
                </div>
            </div>
        </section>
    )
}


