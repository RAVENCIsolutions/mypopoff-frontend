import Layout01 from "@/templates/layout-01";
import { defaultUser } from "@/data/defaultUser";

const LayoutLookup = {
  "layout-01": (previewWindow = false, userData = defaultUser) => (
    <Layout01 previewWindow={previewWindow} userData={userData} />
  ),
};
