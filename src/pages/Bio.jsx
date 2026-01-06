import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Bio = () => {
  const { memberName } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to render bio text with clickable links and proper formatting
  const renderBioText = (text) => {
    if (!text) return 'Biography information will be updated soon.';
    
    // Split text by paragraphs (double newlines)
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Regular expression to find URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      
      // Split paragraph by URLs to create parts
      const parts = paragraph.split(urlRegex);
      
      return (
        <p key={index} style={{ marginBottom: '1.5rem' }}>
          {parts.map((part, partIndex) => {
            // Check if this part is a URL
            if (urlRegex.test(part)) {
              return (
                <a
                  key={partIndex}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#06038F',
                    textDecoration: 'underline',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#050277';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#06038F';
                  }}
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };
  const goHome = () => {
    navigate("/");
    window.location.reload(); // force refresh
  };
  // Team members data (same as Leadership page)
  const teamMembers = [
    // Directors
    {
      name: 'Ms Nasreen Fatima',
      title: 'Director',
      description: 'Secretary and Correspondent of Neo Rosary School. B.Sc, B.Ed, B.M.R.C.Sc., MA in English Literature, and M.Ed',
      image: '/assets/images/leadership/Ms.-Nasreen-Fatima-Director-1.jpg',
      hasImage: true,
      category: 'directors',
      fullBio: `Secretary and Correspondent of Neo Rosary Nursery, K.G & High School. With a background in B.Sc, B.Ed, B.M.R.C.Sc., MA in English Literature, and M.Ed. 
      Nasreen Fatima has dedicated her career to educational leadership. She has also served as the Joint Secretary of Nation Builders Academy and the General Secretary of Telangana Science Fair Academy.
Her contributions to the field have included the publication of several books such as “English Language Program” for School Students (I to X), “A Creative Approach to Learning Pedagogy” for Kindergarten, and “Collaboration of School with Organizations/Universities/Institutions.” Additionally, her seminar paper on National Science Day was published by SCERT.
Nasreen Fatima has actively participated in various workshops and training programs to enhance her skills. These have included a 15-day workshop on “Jiva’s Career Guidance and Livelihood Program,” a two-year program on “Teachers Training and Management Skills” by the Centre for Better Teachers (CfBT), and the City Fellowship Program by the India School Leadership Institute (ISLI). Moreover, she is a certified Career Counselor from IC3 (International Career and College Counseling).
As an advocate for quality education, Nasreen Fatima has been recognized and awarded for her contributions. Some notable achievements include the Rotary Club award for promoting girls’ education, the India School Leadership award for completing the fellowship program with distinction, and the Global Education and Training Institute award for participating in a panel discussion on the pandemic’s effect on education stakeholders.
She has also been recognized for her writing and speaking engagements, receiving awards such as the Dynamic Woman Award, Science Seva Ratna Award, Iconic Woman Award, and the Bharat Ratna Moulana Abul Kalam Azad Award. Furthermore, she has actively contributed to the community during challenging times, receiving the Seva Bharat Award for serving humanity during the pandemic.`
    },
    {
      name: 'Ms Tahseen Sakina',
      title: 'Director',
      description: 'Trained post graduate with over 32 years of experience in reputed schools as Academic Director, Principal, Vice Principal',
      image: '/assets/images/leadership/Ms-Tahseen-Sakina-Director.png',
      hasImage: true,
      category: 'directors',
      fullBio: `Ms. Tahseen Sakina is an experienced education professional with extensive expertise in whole-school transformation and student-centric learning. She has served as Resource Person and Facilitator at Educomp Solutions Limited and Manager Academics/Project Coordinator at Learning Links Foundation for the research project How Do Students Want to Learn (2008–2013), focusing on activity-based approaches in affordable private schools. Currently, she is Academic Director for a group of schools and an active member of the Women Educational Forum and AIMPLB Women’s Wing.

Her core competencies include training and orientation for school stakeholders, life skills development (Grades 1–10), Math Lab and English proficiency training, and training the trainers for multiple educational projects. She has also served as Center Head of Hindi Prachar Sabha, Hyderabad, and holds certifications as a Google Educator Level 1 (2021) and International Certified Career Coach Level 1 – Mindler (2020).
`
    },
    {
      name: 'Ms Niloufer Baig',
      title: 'Director',
      description: 'Senior Leader with Master\'s degree and over 12 years of experience overseeing operations across Telangana and Andhra Pradesh',
      image: '/assets/images/leadership/Niloufer Baig_croped.jpg',
      hasImage: true,
      category: 'directors',
      fullBio: 'Niloufer Baig, with a Master’s degree and over 12 years of extensive experience in the education sector, has excelled across various domains such as delivering curriculum to the secondary school learners, administrative management, grievance handling, and staff recruitment. Her broad expertise and comprehensive understanding of educational operations have made her a dynamic and adaptable leader. Currently, she holds the position of Senior Leader at NEIEA, overseeing operations across Telangana and Andhra Pradesh. In this role, she is deeply involved in strategic leadership, client liaisoning, and mentorship, fostering collaboration among stakeholders contributing to the professional development of her team.'
    },

    // Advisors
    {
      name: 'Dr. K. N. Anandan',
      title: 'Co-Founder & Guru',
      description: 'Indian Linguist, ELT specialist and social activist. Developer of Discourse Oriented Pedagogy (DOP)',
      image: '/assets/images/leadership/Dr.K.Anand.png',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Dr. K. N. Anandan holds a PGCTE, PGDTE, M. Litt, and PhD from CIEFL, Hyderabad. He has extensive experience working as a consultant with the District Primary Education Programme (DPEP) and later with Sarva Shiksha Abhiyan (SSA) in Kerala.\n\nAnandan\'s conceptualization of Discourse Oriented Pedagogy (DOP) has revolutionized second language pedagogy in the states of Kerala and Telangana, as reflected in the Kerala Curriculum Framework (KCF-2007) and the State Curriculum Framework (SCF-2011). DOP draws inspiration from linguistic theories, SLA theories, and cognitive psychology. Its implementation has made a significant impact in select schools of Pondicherry, Mandya in Karnataka, and other regions.\n\nDr. Anandan has contributed to the field of second language pedagogy through his publications in esteemed journals such as LLT – A Journal on Language and Language Teaching, Fortell – A peer-reviewed journal of Teaching English, and REISI journals. Notably, he has authored two books on second language pedagogy, "Tuition to Intuition" (2006) and "Freedom from Imperial Shackles" (2016). His book "Bhashasastrathile Chomskyan Viplavam" (The Chomskyan Revolution in Linguistics) written in Malayalam, was honored with the Kerala Sahithya Academy Endowment Award (2006). Additionally, he shares his insights and research on pedagogy through his blog, "Critical Lens" (http://drknanandan.blogspot.com).\n\nOver the past two decades, Dr. Anandan has developed various programs based on DOP principles, including Second Language Acquisition Programme (SLAP), Rapid Acquisition of Competence in English (RACE), Rapid English Acquisition Programme (REAP), Promoting Acquisition of Competence in English (PACE), Facilitating Acquisition of Competence in English (FACE), Acquiring Competence in English (ACE), and Special Package for Acquiring Competence in English (SPACE). These programs cater to different government agencies and NGOs, targeting learners at various levels.\n\nCurrently, Dr. Anandan serves as a freelance English consultant, offering his expertise and services to various institutions and organizations. Further information about his work can be found on his website at http://www.anandanacademy.org.'
    },
    {
      name: 'Dr. Peshimam Nazeer Ahmed',
      title: 'Joint Secretary OMEIAT',
      description: '45 years Administrative & Teaching Experience, Government Best Teacher Awardee',
      image: '/assets/images/leadership/Dr. Peshimam Nazeer Ahmed.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: ` Administrative & Teaching Experience of 45 years.
Special Grade Founder Headmaster, Osmania Hr.Sec.School (33 Years) Tirupathur Tirupathur District.
WMO, CBSE School Principal, Wayanad (5 years)
Principal, Matriculation Hr.Sec.School, Tirupathur. ( 2 Years )
Mentor, CBSE Schools.
Govt. of Tamil Nadu Best Teacher Awardee.
Best Teacher-National Awardee.
Trained in NCERT Educational & Cultural Program of 40 days in New Delhi.
Trained in Mathematics Orientation Course at Aligarh Muslim University, Aligarh.
Trained in Teachers Orientation Program at Jamia Milliah, New Delhi.
Trained in Teachers Orientation Program at Osmania University, Hyderabad.
Organization of Muslim Educational Institutions & Associations of Tamil Nadu (OMEIAT) Joint Secretary , MEMBER and Ex. Member OMEIAT since 1977.
Vice-president – Federation of Muslim Educational Institutions and All India Private Schools and Children’s welfare Association.
Secretary, Federation of Muslim Educational Institutions Tamil Nadu.
Educational Advisor – State Board and CBSE Schools.
Editor, Educational Vision.
Former Head TN, Association of Muslim Professionals.
Executive Member – Ambur Muslim Educational Society , Ambur.
Ex General Secretary, Osmania Hr Sec School, Primary School and Muslim Orphanage., Tirupathur, Tirupathur District.
CBSE Schools Recognition Inspection Panel Former Member.
Former Chairperson, Minority Languages ,Tamilnadu Text Books Society.
Director, New Education Policy 1986, Mass Teacher Training Program.
Secretary, Falah e Millath Federation, Tirupathur.`
    },
    {
      name: 'Prof. Shantha Sinha',
      title: 'Advisor',
      description: 'India\'s leading child rights activist. Headed National Commission for Protection of Child Rights (2007-2013), Ramon Magsaysay Award recipient',
      image: '/assets/images/leadership/Prof. Shantha Sinha.png',
      hasImage: true,
      category: 'advisors',
      fullBio: `India’s leading child rights activist. She headed the National Commission for Protection of Child Rights, Govt of India, from 2007-2013.

In this capacity she addressed issues concerning violation of children’s rights in relation to children’s right to education;child labour and child trafficking; rights of children in areas of civil unrest;  juvenile justice system; corporal punishment, child abuse and violence on children; child malnutrition gender discrimination and girls’ education and so on.

She was the Founder Secretary Trustee of M V Foundation which was responsible for withdrawing over one million children from work and mainstreaming them into public schools. She spearheaded the bridge course program in India for older children. She is the recipient of the Albert Shanker International Educational Award presented by Educational International in recognition in 1998, Ramon Magsaysay Award, 2003 for community leadership and the Padma Shri ( highest civilian award) in 1998 by the Government of India among others. She is also a retired Professor in Political Science, University of Hyderabad.

`
    },
    {
      name: 'Mrs. M. Chaya Ratan',
      title: 'IAS (Rtd.)',
      description: 'IAS (Rtd.) - Retired IAS officer (1977 batch), Master\'s degree in Eco-Social Policy and Planning from London School of Economics',
      image: '/assets/images/leadership/Mrs. M. Chaya Ratan.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Mrs. Ratan is a retired IAS officer (1977 batch). She was an able administrator, implementing several reforms to bring about change in various departments such as health, college and school education, family welfare and tribal welfare, among others. She worked to uplift poor and marginal sections (including the differently abled members) of society, facilitating their access to basic services. Her efforts helped establish 45 Public Healthcare Centres (PHCs) in tribal areas. She holds a master’s degree in Eco-Social Policy and Planning from London School of Economics, England.'
    },
    {
      name: 'Vinod Mubayi',
      title: 'Advisor',
      description: 'American Physicist - Member American Association for the Advancement of Science, American Nuclear Society, PhD from Brandeis University',
      image: '/assets/images/leadership/Vinod Mubayi.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: `Vinod Mubayi, American Physicist. Member American Association for the Advancement of Science, American Nuclear Society, American Solar Energy Society, New York Academy Science.

Mubayi, Vinod was born on September 27, 1941 in Lahore, Punjab, Pakistan. Son of Baikunth Nath and Kunwar Rani (Razdan) Mubayi.

Education:
Bachelor of Science, Delhi (India) U., 1961; Doctor of Philosophy, Brandeis U., 1968. Career Research associate, Cornell Univercity, Ithaca, New York, 1967-1969; research fellow, Tata Institute Fund Research, Bombay, 1969-1974; research associate, Brandeis U., Waltham, Massachusetts, 1974-1975; physicist, Brookhaven National Laboratory, Upton, New York, since 1976. Adjunct Professor State University of New York, Stony Brook, 1978-1981. Consultant United Nations, New York City, 1981-1985, Idea, Inc., Washington, 1984-1987.

Achievements:
Vinod Mubayi has been listed as a noteworthy Physicist by Marquis Who’s Who. Membership Member American Association for the Advancement of Science, American Nuclear Society, American Solar Energy Society, New York Academy Science.`
    },
    {
      name: 'Ms AV AMBIKA',
      title: 'Director',
      description: 'Treasurer of Aman Vedika - Activist, school teacher, theatre artist, singer, documentary film maker',
      image: '/assets/images/leadership/Ms AV AMBIKA.jpeg',
      hasImage: true,
      category: 'directors',
      fullBio: 'Treasurer of Aman Vedika. She has donned many hats- activist, school teacher, theatre artist, singer, documentary film maker for all of which she used her theatre skills to spread her message more effectively.'
    },
    {
      name: 'Ms Uzma Nahid',
      title: 'Advisor',
      description: 'Founder President of India International Women\'s Alliance (IIWA), renowned social activist empowering women since 1977',
      image: '/assets/images/leadership/Ms Uzma Nahid.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: 'A renowned social activist, is the Founder President of India International Women’s Alliance (IIWA). Her journey began in 1977, dedicated to empowering women, particularly within the Muslim community.'
    },
    {
      name: 'Ms. Rubina Mazhar',
      title: 'CEO, SAFA Society',
      description: 'CEO of SAFA Society with extensive experience in organizational leadership and social development',
      image: '/assets/images/leadership/Rubina Mazhar.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Ms. Rubina Mazhar serves as the CEO of SAFA Society, bringing extensive experience in organizational leadership and social development. Her expertise in managing social organizations and implementing community development programs provides valuable insights for NEIEA\'s operational strategies and program management. Her leadership experience helps in scaling educational initiatives effectively.'
    },
    {
      name: 'Dr. Noor Muhammad',
      title: '(Retired IAS) to the Advisory Board. Electoral Management Expert',
      description: 'Retired IAS officer and Electoral Management Expert with extensive administrative experience',
      image: '/assets/images/leadership/Dr Noor Muhammad.png',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Dr. Noor Muhammad is a retired IAS officer and Electoral Management Expert who brings extensive administrative and governance experience to NEIEA\'s Advisory Board. His expertise in public administration, electoral processes, and governance structures provides valuable guidance for organizational management and policy implementation. His experience in managing large-scale administrative processes helps in effective program delivery.'
    },
    {
      name: 'Dr. Ashraf Shah',
      title: 'Management Expert',
      description: 'Experienced management professional with expertise in organizational development and strategic planning',
      image: '/assets/images/leadership/Dr Ashraf Shah.jpg',
      hasImage: false,
      category: 'advisors',
      fullBio: 'Dr. Ashraf Shah is a seasoned Management Expert with extensive experience in organizational development and strategic planning. His expertise in management principles, organizational behavior, and strategic implementation provides crucial guidance for NEIEA\'s operational excellence. His knowledge helps in optimizing organizational processes and ensuring effective resource management for maximum educational impact.'
    },
    {
      name: 'Muhammad Husain Zulqarnain',
      title: 'Educationist',
      description: 'Dedicated educationist with deep understanding of educational systems and pedagogical approaches',
      image: '/assets/images/leadership/Muhammed Husain Zulqarnain .png',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Muhammad Husain Zulqarnain is a dedicated educationist with a deep understanding of educational systems and innovative pedagogical approaches. His expertise in educational theory and practice contributes significantly to NEIEA\'s curriculum development and teaching methodologies. His commitment to educational excellence and his understanding of diverse learning needs help in creating inclusive and effective educational programs.'
    },
    {
      name: 'Mahmood Khan',
      title: 'Management Consultant',
      description: 'Professional management consultant with expertise in organizational strategy and business development',
      image: '/assets/images/leadership/Mahmood Khan.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Mahmood Khan is a professional Management Consultant with extensive expertise in organizational strategy and business development. His consulting experience across various sectors brings valuable insights for NEIEA\'s strategic planning and organizational growth. His analytical approach and strategic thinking help in developing sustainable models for educational program expansion and impact measurement.'
    },
    {
      name: 'Basir Mchawi',
      title: 'Director, NEI',
      description: 'Mr. Basir Mchawi is a lifelong activist, educator, and communicator who has dedicated over fifty years to African liberation, cultural celebration, and community empowerment.',
      image: '/assets/images/leadership/Basir Mchawi Director Of NEIEA.png',
      hasImage: true,
      category: 'advisors',
      fullBio: `Mr. Basir Mchawi is a remarkable figure whose career spans activism, education, and communication. With over fifty years devoted to the African Liberation struggle, Mr. Mchawi has emerged as a champion for change.

As an educator, he has held roles from teacher to central office administrator, advocating for independent Black schools. During his tenure in New York City’s Public Schools, he amplified the voices of communities of color as a special assistant to Dr. Richard Green, the city’s first African American Public Schools Chancellor.

Mr. Mchawi co-founded the African Street Carnival, now known as the International African Arts Festival, which celebrates African culture. He recognizes the significance of African cultural practices, having chaired the IAAF for over a decade.

His commitment to community empowerment extends to media. He’s been an editor, contributor, and radio show host, bringing crucial information to the public. Currently, he hosts the award-winning WBAI radio program “Education at the Crossroads” and contributes to local newspapers.

While retired, Mr. Mchawi continues to teach in the CUNY system and remains dedicated to community engagement. His legacy thrives through his tireless dedication to “the people’s” work`
    },
    {
      name: 'Shahzad Nabi',
      title: 'Director, NEI',
      description: 'Mr. Shahzad Nabi is a visionary senior executive and CSR-certified leader driving innovation, sustainable growth, and social impact through his expertise in IT, corporate strategy, and philanthropy.',
      image: '/assets/images/leadership/Shahzad-nabi-Director.png',
      hasImage: true,
      category: 'advisors',
      fullBio: `Mr. Shahzad Nabi is a dynamic Senior Executive and visionary leader in NEI. With a strong focus on sustainable growth, diversity, and inclusion, he brings strategic guidance and IT expertise to organizations, catalyzing the advancement of technology-based startups and SMEs. With a distinguished career spanning Fortune 500 Companies like Verizon Business and MCI WORLDCOM, Mr. Nabi’s impact is evident. As the Director of NexGen Excellence, he has been fostering innovation since 2011. Beyond corporate achievements, he contributes to philanthropy as a Board Trustee at RS Care Foundation. With a background in Computer Science from Birla Institute of Technology Mesra and a commitment to social responsibility, he’s certified as a Corporate Social Responsibility Professional and advocates for peacebuilding. Possessing a diverse skill set ranging from IT management to non-profit leadership, Mr. Shahzad Nabi is a dedicated advocate for growth, innovation, and positive change, making him an exemplary corporate and social influencer.`
    },
    {
      name: 'Prof. Pritham Singh',
      title: 'Professor and Academic Leader',
      description: 'Distinguished professor with extensive academic experience and research contributions',
      image: '/assets/images/leadership/Pritam-Singh.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Prof. Pritham Singh is a distinguished professor and academic leader with extensive experience in higher education and research. His academic expertise and research contributions provide valuable insights for NEIEA\'s educational quality and academic standards. His understanding of pedagogical excellence and academic rigor helps in maintaining high educational standards across all programs.'
    },
    {
      name: 'Prof. Ritu Deewan',
      title: 'Professor and Educational Expert',
      description: 'Experienced professor with specialization in educational development and academic excellence',
      image: '/assets/images/leadership/Ritu-Dewan.jpg',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Prof. Ritu Deewan is an experienced professor with specialization in educational development and academic excellence. Her expertise in curriculum design, educational assessment, and academic quality assurance contributes significantly to NEIEA\'s educational programs. Her focus on educational innovation and student-centered learning approaches helps in developing effective and engaging educational experiences.'
    },
    {
      name: 'Sumeet Rawla',
      title: 'Social Activist',
      description: 'Dedicated social activist with extensive experience in community development and social change',
      image: '/assets/images/leadership/Sumeet Rawla.png',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Sumeet Rawla is a dedicated social activist with extensive experience in community development and driving social change. His grassroots activism and community engagement expertise provide valuable insights for NEIEA\'s community outreach programs. His understanding of social dynamics and community needs helps in developing programs that are truly responsive to local communities and create lasting social impact.'
    },
    {
      name: 'Gita Ramaswamy',
      title: 'Social Activist',
      description: 'Prominent social activist with deep commitment to social justice and community empowerment',
      image: '/assets/images/leadership/Gita Ramaswamy.png',
      hasImage: true,
      category: 'advisors',
      fullBio: 'Gita Ramaswamy is a prominent social activist with a deep commitment to social justice and community empowerment. Her extensive work in social activism and her understanding of marginalized communities provide crucial perspective for NEIEA\'s inclusive education initiatives. Her advocacy for social equity and her experience in grassroots mobilization help ensure that educational programs reach and benefit the most vulnerable populations.'
    },
    // {
    //   name: 'Robert Ball',
    //   title: 'Educationist from New York City',
    //   description: '',
    //   image: '/assets/images/leadership/',
    //   hasImage: false,
    //   category: 'advisors',
    //   fullBio: ''
    // },
    // {
    //   name: 'Kannan Srinivasan',
    //   title: 'Writer & Journalist',
    //   description: '',
    //   image: '/assets/images/leadership/',
    //   hasImage: false,
    //   category: 'advisors',
    //   fullBio: ''
    // },
    // {
    //   name: 'Chris AI Macrae, MA (Cantab)',
    //   title: 'Educationist',
    //   description: '',
    //   image: '/assets/images/leadership/',
    //   hasImage: false,
    //   category: 'advisors',
    //   fullBio: ''
    // },

    // Staff
    {
      name: 'Ms. Reshma Parveen',
      title: 'Human Resource Manager',
      description: 'Experienced HR professional managing organizational human resources and staff development',
      image: '/assets/images/leadership/Dr. Reshma parveen.png',
      hasImage: true,
      category: 'staff',
      fullBio: 'Ms. Reshma Parveen serves as the Human Resource Manager at NEIEA, bringing extensive experience in organizational human resources and staff development. Her expertise in talent management, organizational development, and employee engagement ensures that NEIEA maintains a motivated and skilled workforce. Her focus on professional development and team building contributes to the organization\'s overall effectiveness and staff satisfaction.'
    },
    {
      name: 'Syed Danish Ali',
      title: 'Supervisor',
      description: '20 years experience in diverse domains, 7 years BPO experience, 5 years dedicated to education and teaching',
      image: '/assets/images/leadership/Syed Danish Ali.jpg',
      hasImage: true,
      category: 'staff',
      fullBio: 'Syed Danish Ali is an ardent and devoted individual currently serving as a Supervisor at NEIEA. He holds a background in Political Science and boasts an extensive 20-year experience in diverse domains. During his formative years, he developed impeccable teamwork abilities while working at renowned International BPOs for a period of 7 years. Following that, he ventured into the public relations sector with Hype Communication, where he served many reputable entities for over 7 years as a team leader. However, it was after completing the Effective Teachers Course from Scientology that he discovered his true passion for education. Over the past 5 years, he has diligently honed his teaching skills and expertise, being associated with esteemed institutions like Wigan and Leigh College & IMTA. His profound dedication has had a positive and transformative impact on the lives of countless students and colleagues across India.'
    },
    {
      name: 'Ms Taskeen Tarannum',
      title: 'Deputy Supervisor',
      description: 'B.A, B.Ed with over 12 years of teaching experience, driving force behind online English program at NEIEA',
      image: '/assets/images/leadership/Ms-Taskeen-Tarannum croped.png',
      hasImage: true,
      category: 'staff',
      fullBio: "Ms. Taskeen Tarannum is a highly experienced educator with a B.A, and B.Ed. With over 12 years of teaching experience, she has been a driving force behind the online English program at NEIEA. Ms. Taskeen's unwavering commitment to professional development and adaptability has shaped NEIEA into a pioneering institution in online education. As the deputy supervisor, she continues to inspire her team and foster a positive learning environment for all students at NEIEA."
    },
    {
      name: 'Mr. Sajjad Qasmi',
      title: 'Head of Madarsa Outreach',
      description: 'Specialized leader in Madrasa education outreach and community engagement',
      image: '/assets/images/leadership/Dr. Reshma parveen.png',
      hasImage: false,
      category: 'staff',
      fullBio: 'Mr. Sajjad Qasmi serves as the Head of Madrasa Outreach, specializing in building bridges between traditional Islamic education and modern educational approaches. His expertise in Madrasa education systems and community engagement helps NEIEA develop culturally sensitive programs that respect traditional values while incorporating contemporary educational methods. His work is crucial in expanding NEIEA\'s impact within Islamic educational institutions.'
    },
    {
      name: 'Dr. Saleem Ahmed Qasmi',
      title: 'Madrasa Outreach leader',
      description: 'Expert in Islamic education with extensive experience in Madrasa systems and educational integration',
      image: '/assets/images/leadership/Dr Saleem Ahmad Qasmi.png',
      hasImage: true,
      category: 'staff',
      fullBio: 'Dr. Saleem Ahmed Qasmi is an expert in Islamic education with extensive experience in Madrasa systems and educational integration. As a Madrasa Outreach leader, he works to create meaningful connections between traditional Islamic scholarship and contemporary educational needs. His deep understanding of both traditional and modern educational systems enables him to develop programs that honor Islamic educational traditions while meeting current educational standards.'
    },
    {
      name: 'Ms. Tasneem Khan',
      title: 'Head of English',
      description: 'English language specialist leading English education programs and curriculum development',
      image: '/assets/images/leadership/Tasneem Maam.jpg',
      hasImage: true,
      category: 'staff',
      fullBio: 'Ms. Tasneem Khan serves as the Head of English, specializing in English language education and curriculum development. Her expertise in English language pedagogy and her leadership in developing comprehensive English programs have significantly contributed to improving English language proficiency among NEIEA\'s beneficiaries. Her innovative teaching methods and curriculum design ensure effective English language acquisition across diverse learning contexts.'
    },
    {
      name: 'Ms Farha Khan',
      title: 'Head of Mathematics and IT',
      description: 'Google certified educator, Master\'s in Computer Applications and Mathematics, 15+ years experience',
      image: '/assets/images/leadership/Farha Khan.jpg',
      hasImage: true,
      category: 'staff',
      fullBio: "Ms. Farha is a dynamic team leader, driven by innovation and resourcefulness, boasting a solid background as a Google certified educator, and holding Master's degrees in both Computer Applications and Mathematics. With over 15 years of enriched teaching experience and 5 years as a proficient team leader, she brings a unique blend of technical expertise and academic knowledge to the table."
    },
    {
      name: 'Ms Arzoo Siraj',
      title: 'Head of Social Media and IT Skills training',
      description: 'M.Tech in Computer Science, technical member and team leader for Data entry and operation course',
      image: '/assets/images/leadership/defaultProfile2.jpg',
      hasImage: false,
      category: 'staff',
      fullBio: "Arzoo Siraj, a young and innovative individual has an M.Tech in Computer Science. At NEIEA,she serves as a technical member and holds the role of a team leader for the Data entry and operation course. Her passion lies in providing education to people from all walks of life, empowering them with essential skills. As a multitasking person,she strives to create a dynamic and engaging learning environment that fosters growth and development."
    },
    {
      name: 'Ms. Saba Manzoor',
      title: 'Project Manager',
      description: 'Experienced project manager overseeing program implementation and coordination',
      image: '/assets/images/leadership/defaultProfile2.jpg',
      hasImage: false,
      category: 'staff',
      fullBio: 'Ms. Saba Manzoor serves as a Project Manager, bringing extensive experience in program implementation and coordination. Her expertise in project management methodologies and her ability to coordinate complex educational initiatives ensure that NEIEA\'s programs are delivered efficiently and effectively. Her focus on systematic planning, execution, and monitoring helps maintain high standards of program quality and impact measurement.'
    }
  ];

  // Find the member based on the URL parameter
  const member = teamMembers.find(m => 
    m.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '') === memberName
  );

  if (!member) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Member not found</h2>
          <Link to="/about-us/leadership" className="btn btn-primary">
            Back to Leadership
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bio-page">
      {/* Custom scrollbar styles */}
      <style>
        {`
          .member-details::-webkit-scrollbar {
            width: 0px !important;
            height: 0px !important;
            display: none !important;
          }
          .member-details::-webkit-scrollbar-track {
            display: none !important;
          }
          .member-details::-webkit-scrollbar-thumb {
            display: none !important;
          }
          .member-details {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        `}
      </style>
      {/* Breadcrumb */}
      <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0" style={{ backgroundColor: "transparent" }}>
              <li className="breadcrumb-item">
                <Link to="/" onClick={goHome} style={{ color: "#6c757d", textDecoration: "none" }}>
                  🏠 Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/about-us/leadership" style={{ color: "#6c757d", textDecoration: "none" }}>
                  Leadership
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: "#495057" }}>
                {member.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Bio Content */}
      <section style={{ backgroundColor: "#ffffff", padding: "40px 0" }}>
        <div className="container">

          <div className="row align-items-start" style={{ minHeight: "500px" }}>
            <div className="col-lg-4 mb-4">
              {/* Member Image */}
              <div 
                className="member-image"
                style={{
                  height: "400px",
                  width: "100%",
                  background: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: "8px",
                  border: "1px solid #dee2e6"
                }}
              >
                {member.hasImage ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div 
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "#6c757d",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "48px",
                      fontWeight: "bold"
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-8">
              {/* Member Details */}
              <div 
                className="member-details"
                style={{
                  paddingLeft: "30px",
                  height: "400px",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#6c757d #f8f9fa"
                }}
              >
                <div>
                  <h1 
                    style={{
                      fontSize: "36px",
                      fontWeight: "700",
                      color: "#212529",
                      marginBottom: "8px",
                      lineHeight: "1.1",
                      fontFamily: "Roboto, sans-serif"
                    }}
                  >
                    {member.name}
                  </h1>

                  <h3 
                    style={{
                      fontSize: "22px",
                      color: "#464646",
                      fontWeight: "400",
                      marginBottom: "30px",
                      fontFamily: "Roboto, sans-serif"
                    }}
                  >
                    {member.title}
                  </h3>

                  {/* Full Bio */}
                  <div className="bio-content">
                    <div 
                      style={{
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "-0.01em",
                        color: "#333333",
                        textAlign: "justify",
                        whiteSpace: "pre-line",
                        fontFamily: "Roboto, sans-serif"
                      }}
                    >
                      <p style={{ margin: "0 0 18px 0" }}>
                        {member.fullBio || member.description || 'Biography information will be updated soon.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Carousel */}
      <section style={{ backgroundColor: "#f8f9fa", padding: "40px 0", display: "none" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Section Title */}
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h3 style={{
                  fontSize: "24px",
                  fontWeight: "400",
                  color: "#333333",
                  fontFamily: "Georgia, serif",
                  textTransform: "capitalize"
                }}>
                  Other {member.category === 'directors' ? 'Directors' : 
                         member.category === 'advisors' ? 'Advisors' : 'Staff Members'}
                </h3>
              </div>
              
              <div style={{ position: "relative", overflow: "hidden" }}>
                {(() => {
                  const sameCategoryMembers = teamMembers.filter(m => m.name !== member.name && m.category === member.category);
                  const showNavigation = sameCategoryMembers.length > 2;
                  
                  return (
                    <>
                      {/* Navigation Buttons - Only show if more than 2 members */}
                      {showNavigation && (
                        <>
                          <button
                            onClick={() => {
                              const prevIndex = currentSlide === 0 ? Math.ceil(sameCategoryMembers.length / 2) - 1 : currentSlide - 1;
                              setCurrentSlide(prevIndex);
                            }}
                            style={{
                              position: "absolute",
                              left: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              zIndex: 10,
                              backgroundColor: "#ffffff",
                              border: "1px solid #6c757d",
                              borderRadius: "4px",
                              width: "36px",
                              height: "36px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "16px",
                              color: "#6c757d",
                              fontWeight: "bold"
                            }}
                          >
                            ←
                          </button>

                          <button
                            onClick={() => {
                              const nextIndex = currentSlide === Math.ceil(sameCategoryMembers.length / 2) - 1 ? 0 : currentSlide + 1;
                              setCurrentSlide(nextIndex);
                            }}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              zIndex: 10,
                              backgroundColor: "#ffffff",
                              border: "1px solid #6c757d",
                              borderRadius: "4px",
                              width: "36px",
                              height: "36px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "16px",
                              color: "#6c757d",
                              fontWeight: "bold"
                            }}
                          >
                            →
                          </button>
                        </>
                      )}
                    </>
                  );
                })()}

                {/* Carousel Content */}
                <div style={{ 
                  display: "flex",
                  transition: "transform 0.3s ease",
                  transform: `translateX(-${currentSlide * 100}%)`
                }}>
                  {(() => {
                    const sameCategoryMembers = teamMembers.filter(m => m.name !== member.name && m.category === member.category);
                    const slides = [];
                    
                    // Only show carousel if there are other members in the same category
                    if (sameCategoryMembers.length === 0) {
                      return <div style={{ padding: "40px", textAlign: "center", color: "#6c757d" }}>
                        No other {member.category} members to display.
                      </div>;
                    }
                    
                    //Special case for single member - show on the right with arrow
                    if (sameCategoryMembers.length === 1) {
                      const singleMember = sameCategoryMembers[0];
                      return (
                        <div style={{ 
                          minWidth: "100%", 
                          display: "flex", 
                          justifyContent: "center", 
                          alignItems: "center",
                          padding: "0 40px",
                          gap: "20px"
                        }}>
                          {/* Single Member Card */}
                          <div 
                            style={{
                              width: "280px",
                              backgroundColor: "transparent",
                              borderRadius: "8px",
                              padding: "12px",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              border: "none",
                              cursor: "pointer",
                              transition: "transform 0.2s ease",
                              minHeight: "120px"
                            }}
                            onClick={() => {
                              const memberSlug = singleMember.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
                              navigate(`/about-us/leadership/bio/${memberSlug}`);
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            Member Image
                            <div 
                              style={{
                                width: "80px",
                                height: "100px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                flexShrink: 0,
                                backgroundColor: "#f8f9fa"
                              }}
                            >
                              {singleMember.hasImage ? (
                                <img
                                  src={singleMember.image}
                                  alt={singleMember.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                  }}
                                />
                              ) : (
                                <div 
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "#6c757d",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "24px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {singleMember.name.charAt(0)}
                                </div>
                              )}
                            </div>

                              {/* Member Info */}
                              <div style={{ flex: 1, paddingLeft: "10px" }}>
                                <h4 
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    color: "#333333",
                                    marginBottom: "6px",
                                    fontFamily: "Georgia, serif",
                                    lineHeight: "1.2"
                                  }}
                                >
                                  {singleMember.name}
                                </h4>
                                <p 
                                  style={{
                                    fontSize: "14px",
                                    color: "#6c757d",
                                    margin: "0",
                                    fontFamily: "Georgia, serif",
                                    lineHeight: "1.4"
                                  }}
                                >
                                  {singleMember.title}
                                </p>
                              </div>
                          </div>
                          
                          {/* Navigation Arrow */}
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #6c757d",
                              borderRadius: "4px",
                              width: "36px",
                              height: "36px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "16px",
                              color: "#6c757d",
                              fontWeight: "bold"
                            }}
                            onClick={() => {
                              const memberSlug = singleMember.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
                              navigate(`/about-us/leadership/bio/${memberSlug}`);
                            }}
                          >
                            →
                          </div>
                        </div>
                      );
                    }
                    
                    for (let i = 0; i < sameCategoryMembers.length; i += 2) {
                      const slideMembers = sameCategoryMembers.slice(i, i + 2);
                      slides.push(
                        <div key={i} style={{ minWidth: "100%", display: "flex", gap: "20px", padding: "0 60px", justifyContent: "space-between" }}>
                          {slideMembers.map((teamMember, index) => (
                            <div 
                              key={teamMember.name}
                              style={{
                                width: "280px",
                                backgroundColor: "transparent",
                                borderRadius: "8px",
                                padding: "12px",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "12px",
                                border: "none",
                                cursor: "pointer",
                                transition: "transform 0.2s ease",
                                minHeight: "120px"
                              }}
                              onClick={() => {
                                const memberSlug = teamMember.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
                                navigate(`/about-us/leadership/bio/${memberSlug}`);
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              {/* Member Image */}
                              <div 
                                style={{
                                  width: "80px",
                                  height: "100px",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                  backgroundColor: "#f8f9fa"
                                }}
                              >
                                {teamMember.hasImage ? (
                                  <img
                                    src={teamMember.image}
                                    alt={teamMember.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover"
                                    }}
                                  />
                                ) : (
                                  <div 
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      backgroundColor: "#6c757d",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontSize: "24px",
                                      fontWeight: "bold"
                                    }}
                                  >
                                    {teamMember.name.charAt(0)}
                                  </div>
                                )}
                              </div>

                              {/* Member Info */}
                              <div style={{ flex: 1, paddingLeft: "10px" }}>
                                <h4 
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    color: "#333333",
                                    marginBottom: "6px",
                                    fontFamily: "Georgia, serif",
                                    lineHeight: "1.2"
                                  }}
                                >
                                  {teamMember.name}
                                </h4>
                                <p 
                                  style={{
                                    fontSize: "14px",
                                    color: "#6c757d",
                                    margin: "0",
                                    fontFamily: "Georgia, serif",
                                    lineHeight: "1.4"
                                  }}
                                >
                                  {teamMember.title}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    
                    return slides;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bio;
