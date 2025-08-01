import DashboardLayout from '@/admin_dashboard/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CampusTable from './components/CampusTable';
import CampusModal from './components/CampusModal';

const Campuses = () => {
  const [campuses, setCampuses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCampus, setEditingCampus] = useState(null);

  const fetchCampuses = async () => {
    try {
      const res = await axios.get("https://server.laravel.bpc-bsis4d.com/public/api/getcampuses");
      setCampuses(res.data.campuses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data, id) => {
    const token = localStorage.getItem('token');
    try {
      const url = id
        ? `https://server.laravel.bpc-bsis4d.com/public/api/updatecampus/${id}`
        : "https://server.laravel.bpc-bsis4d.com/public/api/addcampus";

      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      fetchCampuses();
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://server.laravel.bpc-bsis4d.com/public/api/deletecampus/${id}`);
      fetchCampuses();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Campuses</h1>
          <Button onClick={() => { setEditingCampus(null); setOpenModal(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Add Campus
          </Button>
        </div>
        <CampusTable campuses={campuses} onEdit={(c) => { setEditingCampus(c); setOpenModal(true); }} onDelete={handleDelete} />
        {openModal && (
          <CampusModal
            campus={editingCampus}
            onClose={() => setOpenModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Campuses;
