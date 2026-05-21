import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
const MAX_UPLOAD_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

app.use(cors());
app.use(express.json());

// Ensure the directory exists
const uploadDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_UPLOAD_FILE_SIZE,
    files: 40
  }
});
const projectsFilePath = path.join(__dirname, 'src', 'data', 'projects.json');

const readProjects = () => {
  if (!fs.existsSync(projectsFilePath)) {
    return [];
  }
  const content = fs.readFileSync(projectsFilePath, 'utf-8');
  return JSON.parse(content);
};

const writeProjects = (data) => {
  fs.writeFileSync(projectsFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

app.get('/api/projects', (req, res) => {
  try {
    const projects = readProjects();
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Error reading projects' });
  }
});

app.post('/api/projects', upload.any(), (req, res) => {
  try {
    const { title, detail, tags, mediaData } = req.body;
    const formattedTags = tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    
    let thumbnailPath = '';
    const thumbnailFile = req.files.find(f => f.fieldname === 'thumbnail');
    if (thumbnailFile) {
      thumbnailPath = `/assets/${thumbnailFile.filename}`;
    }

    let parsedMediaData = [];
    if (mediaData) {
      try {
        parsedMediaData = JSON.parse(mediaData);
      } catch (e) {
        console.error("Error parsing mediaData:", e);
      }
    }

    const finalMedia = parsedMediaData.map(block => {
      if (block.fileKey) {
        const matchedFile = req.files.find(f => f.fieldname === block.fileKey);
        if (matchedFile) {
          return { id: block.id, type: block.type, url: `/assets/${matchedFile.filename}` };
        }
      }
      return { id: block.id, type: block.type, url: block.url || '' };
    });

    const projects = readProjects();
    const newProject = {
      id: 'proj-' + Date.now(),
      title,
      detail,
      tags: formattedTags,
      image: thumbnailPath,
      media: finalMedia
    };

    projects.push(newProject);
    writeProjects(projects);

    res.status(200).json({ success: true, message: 'Project added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/projects/reorder', express.json(), (req, res) => {
  try {
    const { projects } = req.body;
    if (!projects || !Array.isArray(projects)) {
      return res.status(400).json({ success: false, message: 'Invalid projects data' });
    }
    writeProjects(projects);
    res.status(200).json({ success: true, message: 'Projects reordered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/projects/:id', upload.any(), (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, detail, tags, mediaData, existingImage } = req.body;
    const formattedTags = tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    
    let thumbnailPath = existingImage || '';
    const thumbnailFile = req.files.find(f => f.fieldname === 'thumbnail');
    if (thumbnailFile) {
      thumbnailPath = `/assets/${thumbnailFile.filename}`;
    }

    let parsedMediaData = [];
    if (mediaData) {
      try {
        parsedMediaData = JSON.parse(mediaData);
      } catch (e) {
        console.error("Error parsing mediaData:", e);
      }
    }

    const finalMedia = parsedMediaData.map(block => {
      if (block.fileKey) {
        const matchedFile = req.files.find(f => f.fieldname === block.fileKey);
        if (matchedFile) {
          return { id: block.id, type: block.type, url: `/assets/${matchedFile.filename}` };
        }
      }
      return { id: block.id, type: block.type, url: block.url || '' };
    });

    const projects = readProjects();
    const index = projects.findIndex(p => p.id === projectId);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    projects[index] = {
      ...projects[index],
      title,
      detail,
      tags: formattedTags,
      image: thumbnailPath,
      media: finalMedia
    };

    writeProjects(projects);
    res.status(200).json({ success: true, message: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const projectId = req.params.id;
    let projects = readProjects();
    projects = projects.filter(p => p.id !== projectId);
    writeProjects(projects);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: `Uploaded file is too large. Max allowed size is ${Math.round(MAX_UPLOAD_FILE_SIZE / (1024 * 1024))}MB.`
      });
    }

    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`
    });
  }

  if (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }

  return next();
});

app.listen(port, () => {
  console.log(`CMS Server running at http://localhost:${port}`);
});
