import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Users, 
  Settings,
  BrainCircuit,
  Search,
  CheckCircle2,
  FileText,
  Briefcase,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Filter,
  Code
} from 'lucide-react';

// --- Stub Data --- //
const topCandidates = [
  { 
    id: 1, name: "Sarah Jenkins", role: "Senior Frontend Engineer", score: 94, exp: 6, skills: ["React", "TypeScript", "System Design"], justify: "Exceeds the 5+ years requirement. Deep expertise in React architecture and scalable UI systems.",
    semanticProfile: {
      professionalExperience: ["Led frontend team for 3 years at TechCorp", "Architected scalable design systems using React and TypeScript"],
      academicProjects: ["MSc Thesis on Frontend Performance Optimization"],
      certifications: ["AWS Certified Developer", "Advanced React Patterns"]
    }
  },
  { 
    id: 2, name: "David Chen", role: "Senior Frontend Engineer", score: 88, exp: 4.5, skills: ["Vue", "React", "Node.js"], justify: "Strong javascript fundamentals. Although Vue-heavy, their semantic intent maps perfectly to our core UI requirements.",
    semanticProfile: {
      professionalExperience: ["Fullstack Engineer at StartupX (4.5 years)", "Migrated legacy frontend to Vue/React hybrid architecture"],
      academicProjects: ["E-commerce clone with Node.js backend"],
      certifications: ["Google Cloud Associate"]
    }
  },
  { 
    id: 3, name: "Maria Garcia", role: "Senior Frontend Engineer", score: 82, exp: 5, skills: ["React", "JavaScript", "UX Design"], justify: "Solid technical background combined with strong design intuition. Matches core requirements well.",
    semanticProfile: {
      professionalExperience: ["UX/UI Developer at Agency (5 years)", "Developed interactive dashboards using React and D3.js"],
      academicProjects: ["Interactive WebGL experiments"],
      certifications: ["UI/UX Design Specialization"]
    }
  },
  {
    id: 4, name: "James Wilson", role: "Junior Developer", score: 42, exp: 1, skills: ["HTML", "CSS"], justify: "Lacks the required framework expertise and 4 years of required experience.",
    semanticProfile: {
      professionalExperience: ["Intern at WebStudio (1 year)", "Maintained basic HTML/CSS landing pages"],
      academicProjects: ["Personal blog site"],
      certifications: []
    }
  }
];

// --- Components --- //

const Dashboard = () => (
  <div className="animate-fade-in">
    <div className="section-header">
      <h2 className="section-title">Overview</h2>
      <button className="btn btn-primary"><Briefcase size={18} /> New Job Posting</button>
    </div>

    <div className="stat-grid">
      <div className="glass-card delay-100">
        <div className="stat-label">Active Roles</div>
        <div className="stat-value text-gradient">12</div>
        <div className="stat-label" style={{color: 'var(--success)'}}>+3 this week</div>
      </div>
      <div className="glass-card delay-200">
        <div className="stat-label">Resumes Processed</div>
        <div className="stat-value">4,892</div>
        <div className="stat-label" style={{color: 'var(--accent-primary)'}}>Across all pipelines</div>
      </div>
      <div className="glass-card delay-300">
        <div className="stat-label">Average Match Score</div>
        <div className="stat-value text-gradient" style={{'--neon-blue': 'var(--success)', '--neon-purple': 'var(--success)'}}>76%</div>
        <div className="stat-label">Up 14% since using Intent Mapper</div>
      </div>
    </div>

    <h3 className="section-title" style={{marginTop: '40px', marginBottom: '20px', fontSize: '1.2rem'}}>Top Talent Previews</h3>
    <div className="data-table-wrapper animate-fade-in delay-200">
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Job Role</th>
            <th>Match Score</th>
            <th>Top Skills</th>
          </tr>
        </thead>
        <tbody>
          {topCandidates.slice(0,3).map(c => (
            <tr key={c.id}>
              <td>
                <div className="candidate-name">{c.name}</div>
              </td>
              <td>
                <div className="candidate-role">{c.role}</div>
              </td>
              <td>
                <div className="score-cell">
                  <div className={`score-circle ${c.score < 90 ? 'medium' : ''}`}>
                    {c.score}
                  </div>
                </div>
              </td>
              <td>
                <div className="skills-container">
                  {c.skills.map(s => <span key={s} className="badge badge-neon">{s}</span>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UploadView = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [grouping, setGrouping] = useState('job_role');
  const [hasError, setHasError] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleUpload = () => {
    // Simulate some file validation error randomly on first try
    if (Math.random() > 0.7 && !hasError && !complete) {
      setHasError(true);
      return;
    }
    
    setHasError(false);
    setUploading(true);
    setComplete(false);
    let p = 0;
    const interval = setInterval(() => {
      p += 8;
      if (p > 100) p = 100;
      setProgress(p);
      if(p === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          setComplete(true);
        }, 800);
      }
    }, 150);
  }

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div>
          <h2 className="section-title">Multi-Format Resume Ingestion</h2>
          <p style={{color: 'var(--text-secondary)', marginTop: '8px'}}>Upload PDF, DocX, or Images. Our Semantic Mapper handles non-linear layouts automatically.</p>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Group Uploads By:</span>
        <select 
          className="dark-select" 
          value={grouping} 
          onChange={(e) => setGrouping(e.target.value)}
          disabled={uploading}
        >
          <option value="job_role">Target Job Role</option>
          <option value="batch_date">Batch Date (Default)</option>
        </select>
        {grouping === 'job_role' && (
          <input 
            type="text" 
            className="dark-input" 
            placeholder="e.g. Frontend Engineer" 
            defaultValue="Senior Frontend Engineer"
            disabled={uploading}
          />
        )}
      </div>

      {hasError && (
        <div className="glass-card animate-fade-in" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid var(--danger)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <AlertTriangle color="var(--danger)" />
          <div>
            <div style={{ fontWeight: 600, color: '#fff' }}>Validation Error Detected</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>File 'resume_corrupt.pdf' is unsupported or corrupted. Please remove it and try again.</div>
          </div>
          <button className="btn btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setHasError(false)}>Retry Valid Files</button>
        </div>
      )}

      <div className={`upload-area ${uploading ? 'active' : ''}`} onClick={!uploading ? handleUpload : undefined}>
        {uploading ? (
          <div className="animate-fade-in">
            <BrainCircuit className="upload-icon" style={{ animation: 'pulse-glow 2s infinite' }} />
            <div className="upload-title">Semantic Parsing in Progress...</div>
            <div className="upload-subtitle">Extracting hierarchies and normalising profiles for {grouping === 'job_role' ? 'specified role' : 'batch date'}</div>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Processing non-linear layouts...</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <UploadCloud className="upload-icon" />
            <div className="upload-title">Drag & Drop Resumes Here</div>
            <div className="upload-subtitle">Supports PDF, DOCX, PNG, JPG. Our engine parses tables and sidebars accurately.</div>
            <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleUpload(); }}>
              Browse Files to Upload
            </button>
          </div>
        )}
      </div>

      {complete && (
        <div className="glass-card animate-fade-in" style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--success)' }}>
          <CheckCircle2 color="var(--success)" size={32} />
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Successfully processed 42 resumes</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Profiles normalized into JSON and assigned to {grouping === 'job_role' ? 'Senior Frontend Engineer' : 'Current Batch'}.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RankingView = () => {
  const [jdUploaded, setJdUploaded] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [expFilter, setExpFilter] = useState('');
  
  const handleJDUpload = () => {
    setJdUploaded(true);
  };

  const filteredCandidates = topCandidates.filter(c => {
    if (expFilter && c.exp < parseInt(expFilter)) return false;
    return true;
  });

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div>
          <h2 className="section-title">JD-to-Candidate Ranking Dashboard</h2>
          <p style={{color: 'var(--text-secondary)', marginTop: '8px'}}>Calculate compatibility using semantic weighted ranking based on JD intent.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {!jdUploaded ? (
            <button className="btn btn-primary" onClick={handleJDUpload} style={{ animation: 'pulse-glow 2s infinite' }}>
              <FileText size={18} /> Upload Job Description (JD)
            </button>
          ) : (
             <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--success)' }}>
               <CheckCircle2 size={16} color="var(--success)" />
               <span style={{ fontSize: '0.9rem', color: 'var(--success)' }}>JD Active: Sr Frontend Engineer</span>
             </div>
          )}
        </div>
      </div>

      {jdUploaded && (
        <>
          <div className="glass-card animate-fade-in" style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Filter size={18} color="var(--text-secondary)" />
            <select 
              className="dark-select" 
              value={expFilter} 
              onChange={(e) => setExpFilter(e.target.value)}
            >
              <option value="">All Experience Levels</option>
              <option value="2">2+ Years</option>
              <option value="4">4+ Years</option>
              <option value="6">6+ Years</option>
            </select>
            <div className="glass-card" style={{ padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, background: 'transparent' }}>
              <Search size={16} color="var(--text-secondary)" />
              <input type="text" placeholder="Filter by Top Skills..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '150px' }} />
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Showing {filteredCandidates.length} Candidates</span>
          </div>

          <div className="data-table-wrapper animate-fade-in">
            <table>
              <thead>
                <tr>
                  <th>Candidate (Click for Profile)</th>
                  <th>Match Score</th>
                  <th>Exp (Years)</th>
                  <th>Extracted Skills</th>
                  <th>AI Justification</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map(c => (
                  <React.Fragment key={c.id}>
                    <tr 
                      style={{ cursor: 'pointer', background: expandedId === c.id ? 'rgba(255,255,255,0.03)' : '' }} 
                      onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {expandedId === c.id ? <ChevronUp size={16} color="var(--accent-primary)"/> : <ChevronDown size={16} color="var(--text-secondary)"/>}
                          <div>
                            <div className="candidate-name">{c.name}</div>
                            <div className="candidate-role">{c.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="score-cell">
                          <div className={`score-circle ${c.score < 90 ? (c.score < 50 ? 'danger' : 'medium') : ''}`}>
                            {c.score}
                          </div>
                        </div>
                      </td>
                      <td style={{fontWeight: 500}}>{c.exp} Yrs</td>
                      <td>
                        <div className="skills-container">
                          {c.skills.map(s => <span key={s} className={`badge ${c.score < 50 ? 'badge-warning' : 'badge-neon'}`}>{s}</span>)}
                        </div>
                      </td>
                      <td className="ai-justification">{c.justify}</td>
                    </tr>
                    
                    {expandedId === c.id && (
                      <tr className="expanded-row">
                        <td colSpan={5} style={{ padding: 0, borderBottom: '1px solid var(--border-color)' }}>
                          <div className="profile-json-viewer animate-fade-in">
                            <div className="viewer-header">
                              <Code size={16} /> Semantic Profile & Intent Mapper Normalization
                            </div>
                            <pre className="json-code">
{JSON.stringify(c.semanticProfile, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                      No candidates match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {!jdUploaded && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px', borderStyle: 'dashed', background: 'rgba(255,255,255,0.01)' }}>
          <FileText size={48} color="var(--text-secondary)" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h3 style={{ marginBottom: '8px' }}>Waiting for Job Description</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>Upload a JD to begin the weighted ranking process. Our engine will calculate compatibility scores against the normalized profiles in your pool.</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo text-gradient">
          <BrainCircuit size={32} />
          <h1>SmartTalent</h1>
        </div>
        
        <nav style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <UploadCloud size={20} />
            <span>Resume Ingestion</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={() => setActiveTab('ranking')}
          >
            <Users size={20} />
            <span>Candidate Ranking</span>
          </div>
        </nav>

        <div style={{marginTop: 'auto', padding: '0 24px'}}>
          <div className="glass-card" style={{padding: '16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--neon-purple))'}} />
            <div>
              <div style={{fontSize: '0.9rem', fontWeight: 600}}>HR Admin</div>
              <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>System Preferences</div>
            </div>
            <Settings size={18} style={{marginLeft: 'auto', color: 'var(--text-secondary)'}} />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'upload' && <UploadView />}
        {activeTab === 'ranking' && <RankingView />}
      </main>
    </div>
  );
}

