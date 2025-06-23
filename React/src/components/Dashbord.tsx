import React, { useState, useEffect } from "react";
import  Subject  from "./Subjects";
import  Exam from "./FileUploader";
import { Card, CardContent } from "./CardProps";
import { CardHeader } from "@mui/material";   
import {
  GraduationCap,
  FileText,
  Users,
  Clock,
  CheckCircle2
} from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const [stats, setStats] = useState({
    subjects: 0,
    exams: 0,
    gradedExams: 0,
    pendingExams: 0,
  });
  const [recentExams, setRecentExams] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const subjects = await Subject.filter({ teacher_email: user.email });
      const exams = await Exam.filter({ teacher_email: user.email });

      const gradedExams = students.filter((exam: { grade: null; }) => exam.grade != null).length;

      setStats({
        subjects: subjects.length,
        exams: exams.length,
        gradedExams,
        pendingExams: students.length - gradedExams,
      });

      setRecentExams(exams.slice(0, 5));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">ברוכים הבאים למערכת בדיקת המבחנים</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="מקצועות"
            value={stats.subjects}
            icon={GraduationCap}
            color="bg-blue-500"
          />
          <StatsCard
            title="מבחנים"
            value={stats.exams}
            icon={FileText}
            color="bg-green-500"
          />
          <StatsCard
            title="מבחנים שנבדקו"
            value={stats.gradedExams}
            icon={CheckCircle2}
            color="bg-purple-500"
          />
          <StatsCard
            title="ממתינים לבדיקה"
            value={stats.pendingExams}
            icon={Clock}
            color="bg-orange-500"
          />
        </div>

        <Card>
          <CardHeader>
            <Card>מבחנים אחרונים</Card>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.length > 0 ? (
                recentExams.map((exam:any) => (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div>
                      <h3 className="font-medium">{exam.title}</h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(exam.exam_date), "yyyy-MM-dd")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {exam.student_count || 0} תלמידים
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  אין מבחנים להצגה
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}