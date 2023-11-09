import {Auth} from "aws-amplify";
import PageContainer from "../containers/PageContainer";
import {RegistryDataGrid} from "@akello/react-medical";

const RegistryPage = () => {
    return (
        <>
            <PageContainer>
                Registry Page

                <RegistryDataGrid patients={[]} handlePatientClickEvent={()=> {}}/>
            </PageContainer>
        </>
    )
}

export default RegistryPage