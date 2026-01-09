// 1️⃣ Categories list with slug
export const coursesCategory = [
    { id: 1, name: "English Courses", slug: "english", path: "/courses/english" },
    { id: 2, name: "Math Courses", slug: "math", path: "/courses/math" },
    { id: 3, name: "Science Courses", slug: "science", path: "/courses/science" },
    { id: 4, name: "Social Science Courses", slug: "social-science", path: "/courses/social-science" },
    { id: 5, name: "Teachers Training", slug: "teachers-training", path: "/courses/teachers-training" },
    { id: 6, name: "Technical Courses", slug: "technical", path: "/courses/technical" },
    { id: 7, name: "Financial & Literacy Courses", slug: "financial-literacy", path: "/courses/financial-literacy" },
    { id: 8, name: "NIOS Courses", slug: "nios", path: "/courses/nios" },
    { id: 9, name: "CBSE Courses", slug: "cbse", path: "/courses/cbse" }
];


// 2️⃣ Flat courses list with category slug reference
export const courses = [
    {
        id: 1,
        title: "English Foundational Course",
        duration: "3 months",
        level: "Beginner",
        description: "Foundational English is a meticulously designed course that caters specifically to students who have no prior knowledge of the English language. Understanding the challenges faced by beginners, this course provides a supportive and engaging learning environment. The curriculum is crafted to ensure that students build a strong foundation in English through incremental learning, starting with the most basic concepts and gradually advancing to more complex language skills.",
        targetAudience: [
            "This course is ideal for beginners, including learners who are above 7 years may enroll in the course."
        ],
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754549964244-courseImage.jpeg",
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/HkT4zeg1o709sMm2eHYk7K",
        timeSlots: ["9:00 PM - 10:00 PM"],
        isNew: true,
        category: "english"
    },
    {
        id: 2,
        title: "English Beginners Course",
        description: "Our Beginner's English course is thoughtfully designed for individuals with elementary knowledge of reading and writing in English. Recognizing the challenges beginners face, this course provides a supportive and engaging learning environment. The curriculum is structured to ensure gradual progression from fundamental concepts to more advanced language skills.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754550139517-courseImage.jpeg",
        level: "beginner",
        duration: "3 months",
        targetAudience: [
            "Individuals with elementary knowledge of reading and writing in English, Anyone aged 10 and above eager to learn English from scratch."
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/DmnJbudOuh384ZGQcly7JI",
        timeSlots: [
            "8:00 PM - 9:00 PM",
            "9:00 PM - 10:00 PM",
            "7:00 PM - 8:00 PM"
        ],
        isNew: true,
        category: "english"
    },
    {
        id: 3,
        title: "English Proficiency Course",
        description: "The English Proficiency Course for teachers is tailored to meet the needs of individuals who have partial exposure to English. It is specifically designed to enhance participants' skills in reading, writing, speaking, and listening. The course aims to cultivate proficiency in the English language, equipping participants to communicate effectively and comprehend English in diverse real-life scenarios.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754550336303-courseImage.jpeg",
        level: "intermediate",
        duration: "3 months",
        targetAudience: [
            "Individuals with elementary knowledge of reading and writing in English, Anyone aged 10 and above eager to learn English from scratch"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/GdKctsKDxGr8RS68n74g5K",
        timeSlots: [
            "8:00 PM - 9:00 PM",
            "9:00 PM - 10:00 PM"
        ],
        isNew: false,
        category: "english"
    },
    {
        id: 4,
        title: "Math Elementary School Course",
        description: "This course introduces foundational mathematical concepts to students. It focuses on developing basic numeracy skills, problem-solving abilities, and an understanding of numbers, operations, shapes, and measurements. The course emphasizes interactive and practical applications of math in everyday life, catering to marginalized students who might lack access to traditional schooling.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754550507901-courseImage.jpeg",
        level: "beginner",
        duration: "6 months",
        targetAudience: [
            "Marginalized students aged 6–10 years, equivalent to Class 1-3 level. Learners with limited or no prior exposure to formal education"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/JUUCYRs1s3OEIu4xuHV1qi?mode=ac_t",
        timeSlots: [
            "7:00 PM - 8:00 PM",
            "8:00 PM - 9:00 PM"
        ],
        isNew: true,
        category: "math"
    },
    {
        id: 5,
        title: "Math Middle School Course",
        description: "This course builds on foundational math skills and introduces intermediate-level concepts. It focuses on fractions, decimals, geometry, data handling, and basic algebraic thinking. The curriculum is designed to provide students with problem-solving strategies and the ability to apply mathematical concepts in their daily lives.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754550630557-courseImage.jpeg",
        level: "intermediate",
        duration: "6 months",
        targetAudience: [
            "Students aged 9–13 years, equivalent to Class 4-5 level. Learners advancing from OBE A level or those seeking to strengthen intermediate math skills."
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/JUUCYRs1s3OEIu4xuHV1qi?mode=ac_t",
        timeSlots: [
            "7:00 PM - 8:00 PM",
            "8:00 PM - 9:00 PM"
        ],
        isNew: true,
        category: "math"
    },
    {
        id: 6,
        title: "Math High School Course",
        description: "This advanced course prepares students for higher-level math concepts such as algebra, geometry, and statistics. It emphasizes critical thinking, problem-solving, and the application of mathematics in academic and real-life scenarios.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754550932985-courseImage.jpeg",
        level: "intermediate",
        duration: "6 months",
        targetAudience: [
            "Students aged 12–16 years, equivalent to Class 8 level. Learners aiming to transition to secondary-level mathematics"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/EQf9GLHpbV86te4HEegrBy?mode=ac_t",
        timeSlots: [
            "8:00 PM - 9:00 PM",
            "7:00 PM - 8:00 PM"
        ],
        isNew: true,
        category: "math"
    },
    {
        id: 7,
        title: "Science Elementary School Course",
        description: "This program is designed for very young learners and covers the fundamental skills and knowledge taught in the first three years of primary school. The curriculum would include basic concepts of environmental Science.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754551425979-courseImage.jpeg",
        level: "beginner",
        duration: "6 months",
        targetAudience: [
            "Marginalized students aged 6–10 years, equivalent to Class 1-3 level. Learners with limited or no prior exposure to formal education."
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/EmdnUIcwHrdBPYQ6MQ5vNy",
        timeSlots: [
            "7:00 PM - 8:00 PM",
            "8:00 PM - 9:00 PM"
        ],
        isNew: true,
        category: "science"
    },
    {
        id: 8,
        title: "Science Middle School Course",
        description: "This program targets students in the middle primary grades. The Science subject covered would be more advanced and build upon the foundational skills, including more complex science concepts.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754551546586-courseImage.jpeg",
        level: "intermediate",
        duration: "6 months",
        targetAudience: [
            "Students aged 9–13 years, equivalent to Class 5 level. Learners advancing from those seeking to strengthen intermediate science skills"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/LO72Qr8UED4I1uoWmPgd26",
        timeSlots: [
            "7:00 PM - 8:00 PM",
            "8:00 PM - 9:00 PM"
        ],
        isNew: true,
        category: "science"
    },
    {
        id: 9,
        title: "Science High School Course",
        description: "This level is for students in the upper primary or high school years. The curriculum would introduce science subject in more detail preparing students for secondary education.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754551731672-courseImage.jpeg",
        level: "intermediate",
        duration: "6 months",
        targetAudience: [
            "Students aged 12–16 years, equivalent to Class 6-8 level. Learners aiming to transition to secondary-level science"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/BxSlJJRcXUPA4yZcPpMWD3",
        timeSlots: [
            "8:00 PM - 9:00 PM",
            "7:00 PM - 8:00 PM"
        ],
        isNew: true,
        category: "science"
    },
    {
        id: 10,
        title: "Science Secondary High School Course",
        description: "This level is for students in the secondary stage of education, typically in Class 9. The curriculum builds on the foundational knowledge from earlier years and introduces more structured and in-depth study of subject Science. At this stage, students develop analytical thinking, problem-solving skills, and subject-specific understanding in preparation for the Class 10 board examinations and higher secondary education.",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754552007358-courseImage.jpeg",
        level: "intermediate",
        duration: "6 months",
        targetAudience: [
            "Students aged 14–16 years, equivalent to Class 9 level. Learners preparing for board examinations and aiming to strengthen core concepts in science for higher secondary education."
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/HsN6jOZvM1s5xJwBZfVzz4",
        timeSlots: [
            "7:00 PM - 8:00 PM",
            "8:00 PM - 9:00 PM"
        ],
        isNew: true,
        category: "science"
    },
    {
        id: 12,
        title: "",
        description: "",
        imageUrl: "",
        level: "beginner",
        duration: "",
        targetAudience: [],
        fees: 300,
        whatsappLink: "",
        timeSlots: [],
        isNew: true,
        category: "social-science"
    },
    {
        id: 13,
        title: "Teacher Training Course",
        description: "Focused on digital teaching, student engagement, and classroom management",
        imageUrl: "",
        level: "beginner",
        duration: "3 months",
        targetAudience: [],
        fees: 300,
        whatsappLink: "",
        timeSlots: [],
        isNew: true,
        category: "technical"
    },
    {
        id: 14,
        title: "Basic Microsoft Office Course",
        duration: "45 days",
        level: "beginner",
        description: "Covers Word, Excel, PowerPoint essentials",
        imageUrl: "",
        targetAudience: [],
        fees: 300,
        whatsappLink: "",
        timeSlots: [],
        isNew: true,
        category: "technical"
    },
    {
        id: 15,
        title: "Google Workspace Course",
        duration: "45 days",
        level: "beginner",
        description: "Covers Gmail, Docs, Sheets, Slides, Meet, and Drive",
        imageUrl: "",
        targetAudience: [],
        fees: 300,
        whatsappLink: "",
        timeSlots: [],
        isNew: true,
        category: "technical"
    },
    {
        id: 16,
        title: "",
        duration: "",
        level: "beginner",
        description: "",
        imageUrl: "",
        targetAudience: [],
        fees: 300,
        whatsappLink: "",
        timeSlots: [],
        isNew: true,
        category: "financial-literacy"
    },
    {
        id: 17,
        title: "NIOS OBE Level A (Equivalent to Classes 1–3)",
        description: "NIOS OBE Level A is designed for beginners at the primary level (Classes 1–3 equivalent). The course focuses on building strong foundational skills in literacy, numeracy, and environmental awareness. Along with core subjects, NEIEA also offers basic computer education to help learners become familiar with digital tools at an early stage. The program uses simple, activity-based methods to make learning engaging and accessible.\nSubjects:\nEnglish\nMaths\nEVS\nComputers (Basic Digital Skills)",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754571722912-courseImage.jpeg",
        level: "beginner",
        duration: "6 months",
        targetAudience: [
            "Out-of-school children aged 7 and above, First-generation learners with no formal schooling, Adult learners seeking to begin their education journey, Migrant or marginalized community learners who missed early schooling"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/Ks8OHs4l5JX09NNBP726NA",
        timeSlots: [
            "8:00 PM - 9:00 PM",
            "7:00 PM - 8:00 PM"
        ],
        isNew: true,
        category: "nios"
    },
    {
        id: 18,
        title: "NIOS OBE Level B (Equivalent to Classes 4–5)",
        description: "NIOS OBE Level B is meant for learners at the upper primary stage, equivalent to Classes 4 and 5. This level enhances literacy, numeracy, and awareness of the environment and society. NEIEA includes basic computer education to introduce learners to essential digital skills. The course aims to prepare learners for Level C or mainstream formal education using interactive, learner-friendly methods.\nSubjects Offered:\nEnglish\nMath\nEnvironmental Studies (EVS)\nComputers (Basic Digital Skills)",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754572173134-courseImage.jpeg",
        duration: "1 Year",
        level: "beginner",
        targetAudience: [
            "Children aged 10–14 years, Older learners continuing basic education, Out-of-school learners with foundational knowledge, Adults aiming to complete primary-level studies"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/HkRgJ6KGC0bKKRc0C1iIDx",
        timeSlots: [
            "8:00 PM - 9:00 PM",
            "7:00 PM - 8:00 PM"
        ],
        isNew: true,
        category: "nios"
    },
    {
        id: 19,
        title: "NIOS OBE Level C (Equivalent to Classes 6–8)",
        description: "NIOS OBE Level C is meant for learners at the middle school level, equivalent to Classes 6–8. It strengthens core academic skills and prepares learners for secondary education or vocational paths. NEIEA includes computer education to promote digital literacy and practical skills for real-life applications.\n\nSubjects Offered:\nEnglish\nMathematics\nEVS\nSocial Studies\nData Entry",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754571889390-courseImage.jpeg",
        duration: "1 Year",
        level: "beginner",
        targetAudience: [
            "Learners aged 14+ years, Adults completing foundational education, Out-of-school youth aiming for secondary-level entry, Learners rejoining the education system"
        ],
        fees: 300,
        whatsappLink: "https://chat.whatsapp.com/HkRgJ6KGC0bKKRc0C1iIDx",
        timeSlots: [
            "4:00 PM - 5:00 PM",
            "5:00 PM - 6:00 PM"
        ],
        isNew: false,
        category: "nios"
    },
    {
        id: 20,
        title: "NIOS Xth Grade (Secondary Course)",
        description: "The NIOS Secondary Course is equivalent to Class 10 in the formal education system. It is designed for learners who wish to complete their secondary education through a flexible, learner-centric approach. This program empowers students with essential academic and practical knowledge, preparing them for higher studies, vocational training, or employment opportunities.\nEnglish\nMath\nScience\nHome Science\nSocial Science\nData Entry",
        imageUrl: "https://neiea.s3.ap-south-1.amazonaws.com/courses/1754572257625-courseImage.jpeg",
        duration: "1 Years",
        level: "beginner",
        targetAudience: [
            "Learners who have completed NIOS Level C or Class 8, Out-of-school youth aiming for Class 10 certification, Adults seeking to complete secondary education, Learners from marginalized or remote communities"
        ],
        fees: 0,
        whatsappLink: "https://chat.whatsapp.com/FNP8nKQoPjd5VZpQaZLtZP",
        timeSlots: ["4:00 PM - 5:00 PM"],
        isNew: false,
        category: "nios"
    },
    {
        id: 21,
        title: "",
        duration: "",
        level: "beginner",
        description: "",
        imageUrl: "",
        targetAudience: [],
        fees: 300,
        whatsappLink: "",
        timeSlots: [],
        isNew: false,
        category: "cbse"
    }
];
