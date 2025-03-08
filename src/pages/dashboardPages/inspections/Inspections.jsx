import React, { useState } from 'react';
import { FaPlus, FaEdit, FaEye } from 'react-icons/fa';
import './Inspection.scss';
import InspectionForm from './InspectionForm';

const sampleInspections = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    inspectorName: 'Jenny Rodriguez',
    inspectorEmail: 'JennyRodriguez@gmail.com',
    vehicle: 'Toyota Camry',
    vin: 'JT2BF22K1W0135452',
    mileage: '45210 miles',
    status: 'Completed',
    serviceType: 'Oil Change',
    inspectionDate: '2025-03-05',
    inspectionTime: '10:30',
    additionalServices: [
      { name: 'Tire Pressure Check', description: 'Check and adjust tire pressure on all tires.' }
    ]
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    inspectorName: 'Mike Washington',
    inspectorEmail: 'MikeWashington@gmail.com',
    vehicle: 'Honda Accord',
    vin: 'JHMCG56482C002642',
    mileage: '32450 miles',
    status: 'In Progress',
    serviceType: 'Brake Inspection',
    inspectionDate: '2025-03-06',
    inspectionTime: '14:15',
    additionalServices: []
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    inspectorName: 'Sofia Henderson',
    inspectorEmail: 'SofiaHenderson@gmail.com',
    vehicle: 'Ford Explorer',
    vin: '1FMEU7DE0AU123456',
    mileage: '58720 miles',
    status: 'Scheduled',
    serviceType: 'Fluid Change',
    inspectionDate: '2025-03-10',
    inspectionTime: '09:00',
    additionalServices: [
      { name: 'Wiper Blade Replacement', description: 'Replace front and rear wiper blades.' }
    ]
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    inspectorName: 'Leo Martin',
    inspectorEmail: 'LeoMartin@gmail.com',
    vehicle: 'Chevrolet Malibu',
    vin: '1G1ZD5ST3JF213456',
    mileage: '27890 miles',
    status: 'Completed',
    serviceType: 'Engine Diagnostic',
    inspectionDate: '2025-03-02',
    inspectionTime: '11:45',
    additionalServices: [
      { name: 'Battery Test', description: 'Check battery charge and condition.' },
      { name: 'Air Filter Replacement', description: 'Replace engine air filter.' }
    ]
  },
  {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    inspectorName: 'Amelia Clark',
    inspectorEmail: 'AmeliaClark@gmail.com',
    vehicle: 'Nissan Altima',
    vin: '1N4AL3AP8DN123456',
    mileage: '36540 miles',
    status: 'Scheduled',
    serviceType: 'Tire Rotation',
    inspectionDate: '2025-03-11',
    inspectionTime: '15:30',
    additionalServices: []
  },
];

const StatusBadge = ({ status }) => {
  let badgeClass = 'status-badge';
  
  switch (status.toLowerCase()) {
    case 'completed':
      badgeClass += ' completed';
      break;
    case 'in progress':
      badgeClass += ' in-progress';
      break;
    case 'scheduled':
      badgeClass += ' scheduled';
      break;
    default:
      badgeClass += ' default';
  }
  
  return <span className={badgeClass}>{status}</span>;
};

const ActionButton = ({ icon, label, onClick }) => {
  const Icon = icon;
  
  return (
    <button className="action-button" onClick={onClick}>
      <Icon />
      <span className="action-tooltip">{label}</span>
    </button>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button 
        className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <span>&laquo;</span>
      </button>
      
      {renderPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
        ) : (
          <button 
            key={`page-${page}`}
            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      ))}
      
      <button 
        className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span>&raquo;</span>
      </button>
    </div>
  );
};


const InspectionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; 
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); 
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [inspections, setInspections] = useState(sampleInspections);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`Page changed to ${page}`);
  };

  const handleViewInspection = (id) => {
    const inspection = inspections.find(item => item.id === id);
    setSelectedInspection(inspection);
    setFormMode('view');
    setIsFormOpen(true);
  };

  const handleAddInspection = () => {
    setSelectedInspection(null);
    setFormMode('add');
    setIsFormOpen(true);
  };

  const handleEditInspection = (id) => {
    const inspection = inspections.find(item => item.id === id);
    setSelectedInspection(inspection);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (formMode === 'add') {
      const newInspection = {
        id: inspections.length + 1, 
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', 
        inspectorEmail: formData.clientEmail,
        vehicle: formData.vehicle,
        vin: formData.vin,
        mileage: `${formData.miles} miles`,
        status: 'Scheduled',
        serviceType: formData.serviceType,
        inspectionDate: formData.inspectionDate,
        inspectionTime: formData.inspectionTime,
        additionalServices: formData.additionalServices
      };
      
      setInspections([...inspections, newInspection]);
      console.log('Added new inspection:', newInspection);
    } 
    else if (formMode === 'edit') {
      const updatedInspections = inspections.map(item => {
        if (item.id === selectedInspection.id) {
          return {
            ...item,
            inspectorEmail: formData.clientEmail,
            vehicle: formData.vehicle,
            vin: formData.vin,
            mileage: `${formData.miles} miles`,
            serviceType: formData.serviceType,
            inspectionDate: formData.inspectionDate,
            inspectionTime: formData.inspectionTime,
            additionalServices: formData.additionalServices
          };
        }
        return item;
      });
      
      setInspections(updatedInspections);
      console.log('Updated inspection ID:', selectedInspection.id);
    }
    
    setIsFormOpen(false);
  };

  return (
    <div className="inspections-container">
      <div className="inspections-header">
        <h2>Inspections</h2>
          <div className="action-buttons">
            <button className="action-button-header" onClick={handleAddInspection}>
              <FaPlus />
              <span className="action-tooltip">Add Inspection</span>
            </button>
          </div>
      </div>
      
      <div className="inspections-card">
        <div className="total-inspections">
          <h3>Total Inspections: {inspections.length}</h3>
        </div>
        
        <div className="inspections-table">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Vehicle & VIN</th>
                <th>Mileage</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection) => (
                <tr key={inspection.id}>
                  <td className="inspector-cell">
                    <div className="avatar">
                      <img src={inspection.avatar} alt={inspection.inspectorName} />
                    </div>
                    <div className="inspector-name">{inspection.inspectorName}</div>
                  </td>
                  <td className="vehicle-cell">
                    <div className="vehicle-name">{inspection.vehicle}</div>
                    <div className="vehicle-vin">{inspection.vin}</div>
                  </td>
                  <td className="mileage-cell">{inspection.mileage}</td>
                  <td className="status-cell">
                    <StatusBadge status={inspection.status} />
                  </td>
                  <td className="action-cell">
                    <div className="action-buttons-row">
                      <ActionButton 
                        icon={FaEye} 
                        label="View" 
                        onClick={() => handleViewInspection(inspection.id)} 
                      />
                      <ActionButton 
                        icon={FaEdit} 
                        label="Edit" 
                        onClick={() => handleEditInspection(inspection.id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pagination-container">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
      
      <InspectionForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        onEditClick={handleEditInspection}
        mode={formMode}
        inspectionData={selectedInspection}
      />
    </div>
  );
};

export default InspectionsPage;