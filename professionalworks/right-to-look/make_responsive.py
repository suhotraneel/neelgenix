
html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Right to Look - Neel Genix</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap" rel="stylesheet">
    
    <!-- Global CSS -->
    <link rel="stylesheet" href="../../css/main.css">
    <link rel="stylesheet" href="../../css/navbar.css">

    <style>
        :root {
            --primary-bg: #f4f0ed;
            --font-jost: 'Jost', sans-serif;
            --font-gotham-bold: 'Gotham-Bold', sans-serif;
            --font-gotham-book: 'Gotham-Book', sans-serif;
        }

        /* Reset & Base */
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 0;
            background-color: var(--primary-bg);
            font-family: var(--font-jost);
            overflow-x: hidden;
            color: white;
        }

        /* Layout Utilities */
        .section {
            position: relative;
            width: 100%;
            padding: 100px 0;
            overflow: hidden;
        }
        
        .section-sm { padding: 60px 0; }
        .section-lg { padding: 140px 0; }

        .container {
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 5%;
            position: relative;
            z-index: 2;
        }

        /* Backgrounds */
        .bg-wrap {
            position: absolute;
            inset: 0;
            z-index: 0;
        }
        .bg-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(70, 70, 70, 0.75), rgba(0, 0, 0, 0.9));
        }
        .overlay-dark { background: rgba(0,0,0,0.8); }
        .overlay-light { background: rgba(0,0,0,0.4); }

        /* Typography */
        h1 { font-family: var(--font-gotham-bold); font-size: clamp(32px, 5vw, 64px); line-height: 1.1; margin-bottom: 20px; text-transform: uppercase; }
        h2 { font-family: var(--font-jost); font-weight: 500; font-size: clamp(24px, 4vw, 48px); margin-bottom: 20px; }
        h3 { font-family: var(--font-jost); font-weight: 600; font-size: clamp(20px, 3vw, 32px); margin-bottom: 16px; }
        p, li { font-family: var(--font-gotham-book); font-size: clamp(16px, 2vw, 24px); line-height: 1.5; margin-bottom: 16px; }
        
        .text-center { text-align: center; }
        .text-jost-med { font-family: var(--font-jost); font-weight: 500; }
        .text-accent { color: #f4f0ed; letter-spacing: 0.1em; text-transform: uppercase; }
        .blue-1 { color: #00bfff; }
        .blue-2 { color: #87cefa; }
        .blue-3 { color: #35cec8; }
        .blue-4 { color: #7eeded; }

        /* Components */
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        
        .card-placeholder {
            background: #333;
            border-radius: 24px;
            width: 100%;
            aspect-ratio: 3/4;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            margin-bottom: 24px;
        }

        .phase-title {
            font-size: clamp(48px, 8vw, 96px);
            font-weight: 600;
            letter-spacing: 0.2em;
            margin: 0;
            line-height: 1;
        }
        
        .dashed-border-v {
            position: absolute;
            top: 0;
            width: 4px;
            height: 100%;
            border-left: 4px dashed currentColor;
            opacity: 0.5;
        }

        /* Specific Sections */
        .banner {
            height: 100vh;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .process-flow {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .process-step {
            flex: 1;
            min-width: 250px;
            text-align: center;
        }

        .wireframe-phone {
            border: 5px solid #ccc;
            border-radius: 40px;
            background: #1a1a1a;
            aspect-ratio: 9/19;
            width: 100%;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
            .grid-4, .grid-3 { grid-template-columns: repeat(2, 1fr); }
            .section { padding: 80px 0; }
        }
        
        @media (max-width: 768px) {
            .grid-2 { grid-template-columns: 1fr; }
            .grid-4, .grid-3 { grid-template-columns: 1fr; }
            .section { padding: 60px 0; }
            .process-flow { flex-direction: column; align-items: center; }
            .dashed-border-v { display: none; }
        }
    </style>
</head>
<body>

    <div id="callnavbar" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 1000;"></div>

    <!-- Banner -->
    <div class="section banner">
        <div class="bg-wrap">
            <img src="../../assets/dpattern.jpg" class="bg-img" style="opacity: 0.5;">
            <div class="overlay overlay-light"></div>
        </div>
        <div class="container text-center" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <img src="../../assets/navicon.svg" style="width: 54px; height: 67px;">
            <h1>The Right to Look</h1>
            <p class="text-jost-med" style="font-size: clamp(18px, 3vw, 32px);">Audio-Visual Experience</p>
        </div>
    </div>

    <!-- Details -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <h1 style="color: white; margin-bottom: 20px; font-size: 32px;">PROJECT Overview</h1>
            <p style="margin-bottom: 60px; max-width: 1000px;">
                Right to Look is an immersive audio-visual art gallery experience. By scanning a QR code, visitors access a web app that guides them through the exhibition. Curated audio tours accompany each artwork, allowing users to explore the museum, discover the stories behind each piece, and hear directly the curators' voices.
            </p>

            <h1 style="color: white; margin-bottom: 20px; font-size: 32px;">Team</h1>
            <ul style="list-style: disc; padding-left: 20px; margin-bottom: 60px;">
                <li><strong>Suhotra Chakraborty</strong> (Designer + Developer)</li>
                <li><strong>Ajinkya Satam</strong> (Designer)</li>
                <li><strong>Mansha Jejani</strong> (Designer)</li>
            </ul>

            <h1 style="color: white; margin-bottom: 10px; font-size: 32px;">UX/UI + Development</h1>
            <p>2023-24</p>
        </div>
    </div>

    <!-- Design Process -->
    <div class="section text-center">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <p class="text-accent" style="font-size: 32px; letter-spacing: 0.5em; margin-bottom: 80px;">Design Process</p>
            <div class="grid-4">
                <div class="process-step">
                    <h2 class="blue-1">Enquire</h2>
                    <p style="font-size: 18px;">Explore, gather data, question. Understand the problem's scope.</p>
                </div>
                <div class="process-step">
                    <h2 class="blue-2">Analyze</h2>
                    <p style="font-size: 18px;">Scrutinize data, find patterns, define the problem statement.</p>
                </div>
                <div class="process-step">
                    <h2 class="blue-3">Develop</h2>
                    <p style="font-size: 18px;">Generate solutions, evaluate ideas, and refine planning.</p>
                </div>
                <div class="process-step">
                    <h2 class="blue-4">Establish</h2>
                    <p style="font-size: 18px;">Build prototypes, validate user experience, finalize design.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Enquire Phase -->
    <div class="section text-center" style="padding: 15vh 0;">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="dashed-border-v blue-1" style="left: 40px;"></div>
        <div class="dashed-border-v blue-1" style="right: 40px;"></div>
        <div class="container">
            <h1 class="phase-title blue-1">ENQUIRE</h1>
            <p style="margin-top: 20px;">Explore, gather data, question. Understand the problem's scope.</p>
        </div>
    </div>

    <!-- Domain Study -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <div class="text-center" style="margin-bottom: 80px;">
                <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">Domain Study</p>
            </div>
            <div class="grid-4">
                <div>
                    <div class="card-placeholder">Image</div>
                    <h3>Visitor Engagement</h3>
                    <p style="font-size: 16px;">Exploration of the contemporary art gallery landscape, focusing on visitor engagement strategies.</p>
                </div>
                <div>
                    <div class="card-placeholder">Image</div>
                    <h3>Description vs. Guidance</h3>
                    <p style="font-size: 16px;">Analysis of diverse gallery approaches: minimal description vs. guided experiences.</p>
                </div>
                <div>
                    <div class="card-placeholder">Image</div>
                    <h3>Immersive Experiences</h3>
                    <p style="font-size: 16px;">Research on immersive and semi-immersive experiences in artistic & cultural settings.</p>
                </div>
                <div>
                    <div class="card-placeholder">Image</div>
                    <h3>Audio-Visual Installations</h3>
                    <p style="font-size: 16px;">Study of successful audio-visual installations in museums, galleries and exhibition centres.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Secondary Findings -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <div class="text-center" style="margin-bottom: 80px;">
                <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">Secondary Findings</p>
            </div>
            <div class="grid-3" style="margin-bottom: 60px;">
                <div>
                    <div class="card-placeholder" style="aspect-ratio: 16/9;">Image</div>
                    <p>Common visitor disengagement due to lack of artwork context.</p>
                </div>
                <div>
                    <div class="card-placeholder" style="aspect-ratio: 16/9;">Image</div>
                    <p>Interpretation-focused approach vs. information-driven approach.</p>
                </div>
                <div>
                    <div class="card-placeholder" style="aspect-ratio: 16/9;">Image</div>
                    <p>Potential for digital tools to enhance visitor engagement.</p>
                </div>
            </div>
            <div class="grid-3">
                <div>
                    <div class="card-placeholder" style="aspect-ratio: 16/9;">Image</div>
                    <p>Existing audio guides are underutilized or lack personalization.</p>
                </div>
                <div>
                    <div class="card-placeholder" style="aspect-ratio: 16/9;">Image</div>
                    <p>Desire for a cohesive narrative throughout an exhibition.</p>
                </div>
                <div>
                    <div class="card-placeholder" style="aspect-ratio: 16/9;">Image</div>
                    <p>Lack of interaction with digital space.</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Target Group -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container text-center">
            <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em; margin-bottom: 60px;">Target Group</p>
            <div style="background: rgba(255,255,255,0.1); border: 1px solid white; border-radius: 20px; height: 300px; margin-bottom: 40px;"></div>
            <p style="font-size: 28px;">Individuals, <strong>aged 18-45</strong>, visiting or present in <strong>Mumbai</strong>, including students, employed professionals...</p>
        </div>
    </div>

    <!-- Analyze Phase -->
    <div class="section text-center" style="padding: 15vh 0;">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="dashed-border-v blue-2" style="left: 40px;"></div>
        <div class="dashed-border-v blue-2" style="right: 40px;"></div>
        <div class="container">
            <h1 class="phase-title blue-2">ANALYZE</h1>
            <p style="margin-top: 20px;">Scrutinize data, find patterns, define the problem. Synthesize findings.</p>
        </div>
    </div>
    
    <!-- User Personas -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <div class="text-center" style="margin-bottom: 80px;">
                <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">User Personas</p>
            </div>
            <div class="grid-2">
                <!-- Persona 1 -->
                <div>
                     <div class="grid-2" style="align-items: center; grid-template-columns: 150px 1fr; margin-bottom: 20px;">
                         <div style="width: 150px; height: 150px; background: #333; border-radius: 50%;"></div>
                         <div>
                             <h2 style="margin: 0;">Priya Desai</h2>
                             <p style="margin: 0; color: #ccc;">32, Mumbai</p>
                             <p style="margin: 0;">Marketing Manager</p>
                         </div>
                     </div>
                     <p>Busy professional, enjoys exploring Mumbai's cultural scene...</p>
                </div>
                <!-- Persona 2 -->
                 <div>
                     <div class="grid-2" style="align-items: center; grid-template-columns: 150px 1fr; margin-bottom: 20px;">
                         <div style="width: 150px; height: 150px; background: #333; border-radius: 50%;"></div>
                         <div>
                             <h2 style="margin: 0;">Rohan Kapoor</h2>
                             <p style="margin: 0; color: #ccc;">40, Mumbai</p>
                             <p style="margin: 0;">Tech Entrepreneur</p>
                         </div>
                     </div>
                     <p>High-net-worth individual, appreciates fine art...</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Insights HMW -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <div class="text-center" style="margin-bottom: 60px;">
                <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">Insights - Needs - HMWs</p>
            </div>
            <div class="grid-4">
                <div>
                    <h3 class="blue-2">Engagement</h3>
                    <p style="font-size: 16px;">Visitors seek engaging experiences.</p>
                    <div class="card-placeholder" style="aspect-ratio: 1; margin: 20px 0;"></div>
                    <p style="font-weight: 500;">How might we create semi-immersive experiences?</p>
                </div>
                <div>
                    <h3 class="blue-2">Context</h3>
                    <p style="font-size: 16px;">Lack crucial contextual info.</p>
                    <div class="card-placeholder" style="aspect-ratio: 1; margin: 20px 0;"></div>
                    <p style="font-weight: 500;">How might we deliver contextual info engagingly?</p>
                </div>
                 <div>
                    <h3 class="blue-2">Sharing</h3>
                    <p style="font-size: 16px;">Desire to share experiences.</p>
                    <div class="card-placeholder" style="aspect-ratio: 1; margin: 20px 0;"></div>
                    <p style="font-weight: 500;">How might we make the experience shareable?</p>
                </div>
                 <div>
                    <h3 class="blue-2">Interaction</h3>
                    <p style="font-size: 16px;">Expect digital interaction.</p>
                    <div class="card-placeholder" style="aspect-ratio: 1; margin: 20px 0;"></div>
                    <p style="font-weight: 500;">How might we create a digital interaction space?</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Problem Statement -->
    <div class="section">
         <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
         <div class="container text-center">
             <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em; margin-bottom: 40px;">Problem Statement</p>
             <div style="background: rgba(0,0,0,0.5); padding: 40px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2);">
                 <p style="font-size: clamp(20px, 4vw, 36px); line-height: 1.4;">
                     Art gallery visitors often lack sufficient <strong>contextual information</strong> and <strong>engaging experiences</strong>...
                 </p>
             </div>
         </div>
    </div>

    <!-- Competitive Analysis -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <div class="text-center" style="margin-bottom: 60px;">
                <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">Competitive Analysis</p>
            </div>
            <div class="grid-3" style="gap: 40px;">
                <div>
                   <div class="card-placeholder" style="aspect-ratio: 2/1;"></div>
                   <h3>Orpheo Audio Guides</h3>
                   <p style="font-size: 16px;">Global provider of hardware/software for museum audio.</p>
                </div>
                <div>
                   <div class="card-placeholder" style="aspect-ratio: 2/1;"></div>
                   <h3>Acoustiguide Systems</h3>
                   <p style="font-size: 16px;">Comprehensive audio guide systems for cultural institutions.</p>
                </div>
                <div>
                   <div class="card-placeholder" style="aspect-ratio: 2/1;"></div>
                   <h3>Smartify Art App</h3>
                   <p style="font-size: 16px;">Image recognition for instant art info and tours.</p>
                </div>
                 <div>
                   <div class="card-placeholder" style="aspect-ratio: 2/1;"></div>
                   <h3>Guidekick Audio Tours</h3>
                   <p style="font-size: 16px;">Location-sensitive audio content.</p>
                </div>
                <div>
                   <div class="card-placeholder" style="aspect-ratio: 2/1;"></div>
                   <h3>Google Arts & Culture</h3>
                   <p style="font-size: 16px;">Online platform for exploring art collections.</p>
                </div>
                <div>
                   <div class="card-placeholder" style="aspect-ratio: 2/1;"></div>
                   <h3>Artsteps Virtual</h3>
                   <p style="font-size: 16px;">Create and explore virtual 3D art exhibitions.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Develop Phase -->
    <div class="section text-center" style="padding: 15vh 0;">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="dashed-border-v blue-3" style="left: 40px;"></div>
        <div class="dashed-border-v blue-3" style="right: 40px;"></div>
        <div class="container">
            <h1 class="phase-title blue-3">DEVELOP</h1>
            <p style="margin-top: 20px;">Generate solutions, refine ideas, plan concept to design.</p>
        </div>
    </div>

    <!-- Ideation -->
    <div class="section">
         <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
         <div class="container">
             <div class="text-center" style="margin-bottom: 40px;">
                <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">IDEATION</p>
            </div>
            <div class="grid-4" style="gap: 20px;">
                <div class="card-placeholder" style="aspect-ratio: 1; background: #444;"></div>
                <div class="card-placeholder" style="aspect-ratio: 1; background: #444;"></div>
                <div class="card-placeholder" style="aspect-ratio: 1; background: #444;"></div>
                <div class="card-placeholder" style="aspect-ratio: 1; background: #444;"></div>
            </div>
         </div>
    </div>

    <!-- Solution Concept -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container text-center">
             <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em; margin-bottom: 40px;">Solution Concept</p>
             <div style="background: rgba(255,255,255,0.1); border: 1px solid #aaa; border-radius: 20px; height: 300px; margin-bottom: 40px;"></div>
             <p style="font-size: clamp(20px, 3vw, 32px);">
                 An immersive and accessible web application, with a seamless QR code onboarding process, that delivers curated audio-visual experiences...
             </p>
        </div>
    </div>
    
    <!-- Experience & Information Architecture & Process -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
            <div style="margin-bottom: 100px;">
                <p class="text-accent text-center" style="font-size: 28px; letter-spacing: 0.5em; margin-bottom: 40px;">Experience Architecture</p>
                <div class="card-placeholder" style="aspect-ratio: 16/9; background: transparent; border: 2px dashed #888;">Diagram</div>
            </div>
             <div style="margin-bottom: 100px;">
                <p class="text-accent text-center" style="font-size: 28px; letter-spacing: 0.5em; margin-bottom: 40px;">Information Architecture</p>
                <div class="card-placeholder" style="aspect-ratio: 16/9; background: transparent; border: 2px dashed #888;">HA Diagram</div>
            </div>
             <div>
                <p class="text-accent text-center" style="font-size: 28px; letter-spacing: 0.5em; margin-bottom: 40px;">Process Flows</p>
                <div class="text-center" style="margin-bottom: 20px;">Onboarding at Entrance</div>
                <div class="card-placeholder" style="aspect-ratio: 16/5; background: transparent; border: 2px dashed #888;">Flow Diagram</div>
            </div>
        </div>
    </div>

    <!-- Establish Phase -->
    <div class="section text-center" style="padding: 15vh 0;">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="dashed-border-v blue-4" style="left: 40px;"></div>
        <div class="dashed-border-v blue-4" style="right: 40px;"></div>
        <div class="container">
            <h1 class="phase-title blue-4">ESTABLISH</h1>
            <p style="margin-top: 20px;">Build prototypes, validate user experience, finalize design details.</p>
        </div>
    </div>

    <!-- Low Fi & Explorations -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
             <div class="text-center" style="margin-bottom: 60px;">
                 <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">Low-Fidelity Wireframes</p>
             </div>
             <div class="grid-3" style="gap: 40px; margin-bottom: 100px;">
                 <div class="wireframe-phone"></div>
                 <div class="wireframe-phone"></div>
                 <div class="wireframe-phone"></div>
             </div>
             
             <div class="text-center" style="margin-bottom: 60px;">
                 <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">EXPLORATIONS</p>
             </div>
             <div class="grid-4">
                 <div class="wireframe-phone" style="height: 300px; width: auto;"></div>
                 <div class="wireframe-phone" style="height: 300px; width: auto;"></div>
                 <div class="wireframe-phone" style="height: 300px; width: auto;"></div>
                 <div class="wireframe-phone" style="height: 300px; width: auto;"></div>
             </div>
        </div>
    </div>

    <!-- High Fidelity -->
    <div class="section">
        <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay"></div></div>
        <div class="container">
             <div class="text-center" style="margin-bottom: 60px;">
                 <p class="text-accent" style="font-size: 28px; letter-spacing: 0.5em;">High-Fidelity Wireframes</p>
             </div>
             <div class="grid-4" style="gap: 20px;">
                 <div>
                     <div class="wireframe-phone" style="background: #111;"></div>
                     <p class="text-center" style="margin-top: 20px; font-weight: 500;">Onboarding</p>
                 </div>
                 <div>
                     <div class="wireframe-phone" style="background: #111;"></div>
                     <p class="text-center" style="margin-top: 20px; font-weight: 500;">Studio List</p>
                 </div>
                 <div>
                     <div class="wireframe-phone" style="background: #111;"></div>
                     <p class="text-center" style="margin-top: 20px; font-weight: 500;">Studio Page</p>
                 </div>
                 <div>
                     <div class="wireframe-phone" style="background: #111;"></div>
                     <p class="text-center" style="margin-top: 20px; font-weight: 500;">Artwork Page</p>
                 </div>
             </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="section" style="background: black; padding: 60px 0;">
         <div class="bg-wrap"><img src="../../assets/spattern.jpg" class="bg-img"><div class="overlay overlay-dark"></div></div>
         <div class="container text-center">
             <p style="opacity: 0.7;">© Copyright, 2024. All Rights Reserved.</p>
         </div>
    </div>

</body>
</html>
"""

with open('/Users/coschool/Documents/NeelGenixDevelopment/neelgenix/professionalworks/right-to-look/index.html', 'w') as f:
    f.write(html_content)

print("Responsive index.html created successfully.")
