import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Страницы

import LoginPage from "../pages/LoginPage"; // Авторизация

import ProfilePage from "../routes/ProfilePage"; // Профиль
import EditProfile from "../ui/ProfileLayout/ProfileEditPage"; // редактирование информации профиля

import Classroom from "../routes/ClassroomPage"; // Классное руководство
import ClassroomEditStudent from "../ui/ClassroomLayouts/ClassroomEditStudent"; // Редактирование ученика в классе
import ClassroomCreateStudent from "../ui/ClassroomLayouts/ClassroomCreateStudent"; // Новый ученик

import EducationWorkPage from "../routes/EducationWorkPage"; // Воспитательная работа
import EducationWorkEdit from "../ui/EducationWorkLayouts/EducationWorkEdit"; // Редактирование воспитательного события
import GoalsOfEducationalWork from "../ui/EducationWorkLayouts/GoalsOfEducationalWork"; // Цель воспитательной работы
import EducationWorkArchive from "../ui/EducationWorkLayouts/EducationWorkArchive"; // Архив
import CreateEvent from "../ui/EducationWorkLayouts/EducationWorkCreateEvent"; // Новый ивент

import ReportManagerPage1 from "../routes/ReportManagerPage"; // менеджер отчетов, вкладка 1
import ReportManagerPage2 from "../ui/ReportManagerLayouts/ReportManagerClasses"; // менеджер отчетов, вкладка 2

import ControlPage from "../routes/ControlPage"; // Управление системой
import ControlSystemEvents from "../ui/ControlSystemLayouts/ControlSystemEvents"; // Управление системой, воспитательный события
import ControlSystemClasses from "../ui/ControlSystemLayouts/ControlSystemClasses"; // Управление системой, классы
import ControlSystemPlans from "../ui/ControlSystemLayouts/ControlSystemPlans"; // Управление системой, планы

import NotFoundPage from "../pages/NotFound";

export default function AppRouter() {
    return (
        <Router>
            <div className="page">
                <Routes>
                    <Route path="/" exact element={<LoginPage/>}/>
                    <Route path="/profile" exact element={<ProfilePage/>}/>
                    <Route path="/profile_edit" exact element={<EditProfile/>}/>
                    <Route path="/classroom" exact element={<Classroom/>}/>
                    <Route path="/educational_work" exact element={<EducationWorkPage/>}/>
                    <Route path="/educational_work_edit" exact element={<EducationWorkEdit/>}/>
                    <Route path="/educational_work_archive" exact element={<EducationWorkArchive/>}/>
                    <Route path="/goals_of_educational_work" exact element={<GoalsOfEducationalWork/>}/>
                    <Route path="/classroom_edit_student" exact element={<ClassroomEditStudent/>}/>
                    <Route path="/report_manager_employment" exact element={<ReportManagerPage1/>}/>
                    <Route path="/report_manager_classes" exact element={<ReportManagerPage2/>}/>
                    <Route path="/control_users" exact element={<ControlPage/>}/>
                    <Route path="/control_events" exact element={<ControlSystemEvents/>}/>
                    <Route path="/control_classes" exact element={<ControlSystemClasses/>}/>
                    <Route path="/control_plans" exact element={<ControlSystemPlans/>}/>
                    <Route path="/create_new_student" exact element={<ClassroomCreateStudent/>}/>
                    <Route path="/create_event" exact element={<CreateEvent/>}/>
                    <Route path="/*" exact element={<NotFoundPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}