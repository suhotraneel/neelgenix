import React, { useState, useEffect } from 'react';
import './AdminCMS.css';

function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [status, setStatus] = useState('');
  
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('dashboard'); // 'dashboard', 'edit', 'add'
  const [currentProject, setCurrentProject] = useState(null);

  // Form state
  const [formData, setFormData] = useState({ title: '', detail: '', tags: '' });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [mediaBlocks, setMediaBlocks] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      setStatus('Failed to fetch projects');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'neelgenix') {
      setIsAuthenticated(true);
      setStatus('');
    } else {
      setStatus('Incorrect password');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchProjects();
      }
    } catch (err) {
      alert("Error deleting project.");
    }
  };

  const startEdit = (project) => {
    setCurrentProject(project);
    setFormData({ title: project.title, detail: project.detail, tags: project.tags.join(', ') });
    setExistingImage(project.image || '');
    setThumbnailFile(null);
    setMediaBlocks(project.media ? project.media.map(m => ({ ...m, file: null, isNew: false })) : []);
    setView('edit');
    setStatus('');
  };

  const startAdd = () => {
    setCurrentProject(null);
    setFormData({ title: '', detail: '', tags: '' });
    setExistingImage('');
    setThumbnailFile(null);
    setMediaBlocks([]);
    setView('add');
    setStatus('');
  };

  const addMediaBlock = (type) => {
    setMediaBlocks([...mediaBlocks, { id: 'm-' + Date.now(), type, url: '', file: null, isNew: true }]);
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...mediaBlocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    }
    setMediaBlocks(newBlocks);
  };

  const removeBlock = (index) => {
    const newBlocks = [...mediaBlocks];
    newBlocks.splice(index, 1);
    setMediaBlocks(newBlocks);
  };

  const handleMediaFileChange = (index, file) => {
    const newBlocks = [...mediaBlocks];
    newBlocks[index].file = file;
    setMediaBlocks(newBlocks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('detail', formData.detail);
    data.append('tags', formData.tags);
    
    if (thumbnailFile) {
      data.append('thumbnail', thumbnailFile);
    }
    if (existingImage) {
      data.append('existingImage', existingImage);
    }

    const mediaDataPayload = [];
    mediaBlocks.forEach((block, idx) => {
      if (block.file) {
        const fileKey = `media_${idx}`;
        data.append(fileKey, block.file);
        mediaDataPayload.push({ id: block.id, type: block.type, fileKey });
      } else {
        mediaDataPayload.push({ id: block.id, type: block.type, url: block.url });
      }
    });

    data.append('mediaData', JSON.stringify(mediaDataPayload));

    const url = view === 'add' ? 'http://localhost:3001/api/projects' : `http://localhost:3001/api/projects/${currentProject.id}`;
    const method = view === 'add' ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Project saved successfully!');
        fetchProjects();
        setTimeout(() => setView('dashboard'), 1000);
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to connect to CMS Server.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-cms-container">
        <div className="admin-cms-card" style={{ maxWidth: '400px', textAlign: 'center' }}>
          <h1>CMS Login</h1>
          <form onSubmit={handlePasswordSubmit} className="admin-cms-form">
            <div className="form-group">
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" required />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
          {status && <p className="status-message" style={{ textAlign: 'center' }}>{status}</p>}
        </div>
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="admin-cms-container dashboard-view">
        <div className="dashboard-header">
          <h1>Projects Dashboard</h1>
          <button onClick={startAdd} className="submit-btn add-new-btn">Add New Project</button>
        </div>
        {status && <p className="status-message">{status}</p>}
        <div className="project-list-admin">
          {projects.map(p => (
            <div key={p.id} className="project-list-item">
              <div className="project-list-info">
                <strong>{p.title}</strong>
                <p>{p.detail}</p>
              </div>
              <div className="project-list-actions">
                <button className="action-btn edit" onClick={() => startEdit(p)}>Edit</button>
                <button className="action-btn delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p style={{color: '#fff'}}>No projects found.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-cms-container">
      <div className="admin-cms-card large-card">
        <div className="form-header">
          <h1>{view === 'add' ? 'Add New Project' : 'Edit Project'}</h1>
          <button onClick={() => setView('dashboard')} className="back-btn">Back to Dashboard</button>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-cms-form">
          <div className="form-row">
            <div className="form-group">
              <label>Project Name</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Subtitle (Detail)</label>
              <input type="text" value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label>Tags (Comma separated)</label>
            <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="UI Design, Research, AI" required />
          </div>
          
          <div className="form-group thumbnail-group">
            <label>Thumbnail Image</label>
            {existingImage && <div className="existing-img-preview"><img src={existingImage} alt="Thumbnail" /></div>}
            <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files[0])} />
            <small>Leave empty to keep existing thumbnail.</small>
          </div>

          <div className="media-manager">
            <h3>Media Blocks</h3>
            <div className="media-blocks-list">
              {mediaBlocks.map((block, idx) => (
                <div key={block.id} className="media-block-item">
                  <div className="block-controls">
                    <button type="button" onClick={() => moveBlock(idx, 'up')} disabled={idx === 0}>▲</button>
                    <button type="button" onClick={() => moveBlock(idx, 'down')} disabled={idx === mediaBlocks.length - 1}>▼</button>
                  </div>
                  <div className="block-content">
                    <div className="block-header">
                      <strong>{block.type.toUpperCase()} BLOCK</strong>
                      <button type="button" className="remove-block-btn" onClick={() => removeBlock(idx)}>Remove</button>
                    </div>
                    {block.url && !block.file && (
                      <div className="existing-media-preview">
                        {block.type === 'image' ? <img src={block.url} alt="media" /> : <video src={block.url} muted />}
                        <small>Existing Media</small>
                      </div>
                    )}
                    <input type="file" accept={block.type === 'image' ? 'image/*' : 'video/*'} onChange={e => handleMediaFileChange(idx, e.target.files[0])} />
                  </div>
                </div>
              ))}
            </div>
            <div className="add-block-actions">
              <button type="button" onClick={() => addMediaBlock('image')} className="action-btn">Add Image Block</button>
              <button type="button" onClick={() => addMediaBlock('video')} className="action-btn">Add Video Block</button>
            </div>
          </div>

          <button type="submit" className="submit-btn full-width">Save Project</button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
}

export default AdminCMS;
