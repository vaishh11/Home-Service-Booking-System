import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar       from '../AComponents/Sidebar'
import AdminLogin    from '../AComponents/AdminLogin'
import AdminProtect  from './AdminProtect'
import Dashboard     from '../AComponents/Dashboard'
import ManageCategory from '../AComponents/ManageCategory'
import UpdateCategory from '../AComponents/UpdateCategory'
import AddCategory   from '../AComponents/AddCategory'
import AddService    from '../AComponents/AddService'
import ManageService from '../AComponents/ManageService'
import UpdateService from '../AComponents/UpdateService'
import ManageUsers   from '../AComponents/ManageUsers'
import ManageBookings from '../AComponents/ManageBookings'
import ManagePayments from '../AComponents/ManagePayments'
import ManageOrders  from '../AComponents/ManageOrders'
import ViewFeedback  from '../AComponents/ViewFeedback'

export default function AdminRoute() {
  return (
    <Routes>
      {/* Public - no sidebar */}
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />

      {/* Protected - with sidebar */}
      <Route path="/*" element={
        <AdminProtect>
          <Sidebar>
            <Routes>
              <Route path="/AHome"                    element={<Dashboard />} />
              <Route path="/ManageCategory"           element={<ManageCategory />} />
              <Route path="/UpdateCategory/:catid"    element={<UpdateCategory />} />
              <Route path="/AddCategory"              element={<AddCategory />} />
              <Route path="/AddService"               element={<AddService />} />
              <Route path="/ManageService"            element={<ManageService />} />
              <Route path="/UpdateService/:catid"     element={<UpdateService />} />
              <Route path="/ManageUser"               element={<ManageUsers />} />
              <Route path="/ManageBooking"            element={<ManageBookings />} />
              <Route path="/ManagePayment"            element={<ManagePayments />} />
              <Route path="/ManageOrders"             element={<ManageOrders />} />
              <Route path="/ViewFeedback"             element={<ViewFeedback />} />
            </Routes>
          </Sidebar>
        </AdminProtect>
      } />
    </Routes>
  )
}
