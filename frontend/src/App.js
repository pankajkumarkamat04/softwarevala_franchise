import "./assets/css/App.css"
import "mdbreact/dist/css/mdb.css"
import { Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from "./routes/AdminRoutes";
import { useGetAPISettingQuery, useGetGeneralSettingQuery, useGetPaymentSettingQuery } from "./redux/api/SettingAPI";
import PreLoader from "./components/PreLoader";
import { updateSiteData } from "./utils/siteData"
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetProfileQuery } from "./redux/api/UserAPI";
import { useEffect } from "react";
import Cookies from 'js-cookie'
import { setLoading } from "./redux/slice/UserSlice";



function App() {
  const { data: generalSettingData, isLoading: generalSettingIsLoading } = useGetGeneralSettingQuery()
  const { data: paymentSettingData, isLoading: paymentSettingIsLoading } = useGetPaymentSettingQuery()
  const { data: apiData, isLoading: apiIsLoading } = useGetAPISettingQuery()
  const { isAuthorized, user, loading } = useSelector((state) => state.user);
  const [getProfile, { isLoading }] = useLazyGetProfileQuery();
  const dispatch = useDispatch()

  const userRoute = UserRoutes()
  const adminRoute = AdminRoutes()

  useEffect(() => {

    if (Cookies.get('token') == undefined) {
      dispatch(setLoading(false))
    } else {
      if (loading) {
        getProfile()
      }
    }
  }, [isAuthorized])

  if (generalSettingIsLoading || isLoading || paymentSettingIsLoading || apiIsLoading) {
    return <PreLoader />
  }


  updateSiteData({ generalSettingData, paymentSettingData, apiData })

  return (
    <div>
      <Toaster position="top-center" />
      <Routes>
        {userRoute}
        {adminRoute}
      </Routes>
    </div>
  );
}

export default App;
