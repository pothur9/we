export interface Course {
    name: string;
    slug: string;
}

export interface Category {
    name: string;
    slug: string;
    icon: string;
    courses: Course[];
}

export const courseCategories: Category[] = [
    {
        name: "MBA",
        slug: "mba",
        icon: "fas fa-briefcase",
        courses: [
            { name: "MBA/PGDM", slug: "mba-pgdm" },
            { name: "Executive MBA", slug: "executive-mba" },
            { name: "Distance MBA", slug: "distance-mba" },
            { name: "Online MBA", slug: "online-mba" },
            { name: "Part-Time MBA", slug: "part-time-mba" },
        ]
    },
    {
        name: "Engineering",
        slug: "engineering",
        icon: "fas fa-cogs",
        courses: [
            { name: "B.E/B.Tech", slug: "be-btech" },
            { name: "M.E/M.Tech", slug: "me-mtech" },
            { name: "Ph.D.", slug: "phd-engineering" },
            { name: "Diploma Courses", slug: "diploma-engineering" },
            { name: "Distance Diploma Courses", slug: "distance-diploma" },
            { name: "Distance B.Tech", slug: "distance-btech" },
        ]
    },
    {
        name: "Medical",
        slug: "medical",
        icon: "fas fa-stethoscope",
        courses: [
            { name: "MBBS", slug: "mbbs" },
            { name: "MD", slug: "md" },
            { name: "MS", slug: "ms" },
            { name: "BDS (Dental)", slug: "bds" },
            { name: "MDS (Dental)", slug: "mds" },
            { name: "BAMS (Ayurveda)", slug: "bams" },
            { name: "BHMS (Homeopathy)", slug: "bhms" },
            { name: "BUMS (Unani)", slug: "bums" },
            { name: "BVSc & AH (Veterinary)", slug: "bvsc" },
            { name: "BMLT", slug: "bmlt" },
            { name: "MPT", slug: "mpt" },
            { name: "MPH", slug: "mph" },
        ]
    },
    {
        name: "Nursing",
        slug: "nursing",
        icon: "fas fa-heartbeat",
        courses: [
            { name: "B.Sc. Nursing", slug: "bsc-nursing" },
            { name: "GNM Nursing", slug: "gnm-nursing" },
            { name: "M.Sc. Nursing", slug: "msc-nursing" },
            { name: "ANM (Auxiliary Nursing)", slug: "anm" },
            { name: "Post Basic B.Sc. Nursing", slug: "post-basic-nursing" },
        ]
    },
    {
        name: "Pharmacy",
        slug: "pharmacy",
        icon: "fas fa-pills",
        courses: [
            { name: "B.Pharm", slug: "bpharm" },
            { name: "D.Pharm", slug: "dpharm" },
            { name: "M.Pharm", slug: "mpharm" },
            { name: "Pharm.D", slug: "pharmd" },
        ]
    },
    {
        name: "Physiotherapy",
        slug: "physiotherapy",
        icon: "fas fa-walking",
        courses: [
            { name: "BPT (Physiotherapy)", slug: "bpt" },
            { name: "MPT (Master of Physiotherapy)", slug: "mpt-physio" },
            { name: "BOT (Occupational Therapy)", slug: "bot" },
            { name: "MOT (Occupational Therapy)", slug: "mot" },
            { name: "BASLP (Speech & Audiology)", slug: "baslp" },
        ]
    },
    {
        name: "Allied Health Sciences",
        slug: "allied-health",
        icon: "fas fa-vials",
        courses: [
            { name: "B.Sc. MLT (Lab Technology)", slug: "bsc-mlt" },
            { name: "B.Sc. Radiology", slug: "bsc-radiology" },
            { name: "B.Sc. Cardiovascular Technology", slug: "bsc-cvt" },
            { name: "B.Sc. OTT (Operation Theatre)", slug: "bsc-ott" },
            { name: "B.Sc. Dialysis Technology", slug: "bsc-dialysis" },
            { name: "B.Sc. Respiratory Therapy", slug: "bsc-respiratory" },
            { name: "B.Sc. Optometry", slug: "bsc-optometry" },
            { name: "B.Sc. Perfusion Technology", slug: "bsc-perfusion" },
        ]
    },
    {
        name: "Design",
        slug: "design",
        icon: "fas fa-palette",
        courses: [
            { name: "B.Des", slug: "bdes" },
            { name: "M.Des", slug: "mdes" },
            { name: "B.Des in Fashion Design", slug: "bdes-fashion" },
            { name: "B.Des in Interior Design", slug: "bdes-interior" },
            { name: "B.Sc in Fashion Design", slug: "bsc-fashion" },
            { name: "B.Sc in Interior Design", slug: "bsc-interior" },
        ]
    },
    {
        name: "Law",
        slug: "law",
        icon: "fas fa-balance-scale",
        courses: [
            { name: "B.A. LL.B.", slug: "ba-llb" },
            { name: "BBA LL.B.", slug: "bba-llb" },
            { name: "LL.B.", slug: "llb" },
            { name: "LL.M.", slug: "llm" },
            { name: "B.Sc. LL.B", slug: "bsc-llb" },
            { name: "B.Com LL.B", slug: "bcom-llb" },
            { name: "B.L.S. LL.B.", slug: "bls-llb" },
        ]
    },
    {
        name: "Hospitality & Travel",
        slug: "hospitality-travel",
        icon: "fas fa-hotel",
        courses: [
            { name: "BHM", slug: "bhm" },
            { name: "Diploma in Hotel Management", slug: "diploma-hotel-management" },
            { name: "B.Sc. In Hotel Management", slug: "bsc-hotel-management" },
        ]
    },
    {
        name: "Mass Communication & Media",
        slug: "mass-communication-media",
        icon: "fas fa-tv",
        courses: [
            { name: "B.J.", slug: "bj" },
            { name: "B.J.M.C.", slug: "bjmc" },
            { name: "B.M.M.", slug: "bmm" },
            { name: "M.A. in Journalism", slug: "ma-journalism" },
            { name: "Diploma in Journalism", slug: "diploma-journalism" },
        ]
    },
    {
        name: "Business & Management",
        slug: "business-management",
        icon: "fas fa-chart-line",
        courses: [
            { name: "BBA", slug: "bba" },
            { name: "Management Certifications", slug: "management-certifications" },
            { name: "MBA/PGDM", slug: "mba-pgdm-business" },
            { name: "Executive MBA/PGDM", slug: "executive-mba-pgdm" },
            { name: "Distance MBA", slug: "distance-mba-business" },
            { name: "Online MBA", slug: "online-mba-business" },
            { name: "Part-Time MBA", slug: "part-time-mba-business" },
        ]
    },
    {
        name: "IT & Software",
        slug: "it-software",
        icon: "fas fa-laptop-code",
        courses: [
            { name: "BCA", slug: "bca" },
            { name: "B.Sc. in IT & Software", slug: "bsc-it" },
            { name: "Distance BCA", slug: "distance-bca" },
            { name: "MCA", slug: "mca" },
            { name: "M.Sc. in IT & Software", slug: "msc-it" },
            { name: "Part-Time MCA", slug: "part-time-mca" },
            { name: "Distance MCA", slug: "distance-mca" },
            { name: "CCNA", slug: "ccna" },
            { name: "DOEACC O Level", slug: "doeacc-o-level" },
        ]
    },
    {
        name: "Humanities & Social Science",
        slug: "humanities-social-science",
        icon: "fas fa-users",
        courses: [
            { name: "B.A.", slug: "ba" },
            { name: "B.Sc. in Humanities & Social Sciences", slug: "bsc-humanities" },
            { name: "B.S.W.", slug: "bsw" },
            { name: "M.A", slug: "ma" },
            { name: "M.Phil.", slug: "mphil" },
            { name: "M.Sc. in Humanities & Social Sciences", slug: "msc-humanities" },
            { name: "MSW", slug: "msw" },
        ]
    },
    {
        name: "Arts",
        slug: "arts",
        icon: "fas fa-paint-brush",
        courses: [
            { name: "BFA", slug: "bfa" },
            { name: "MFA", slug: "mfa" },
        ]
    },
    {
        name: "Science",
        slug: "science",
        icon: "fas fa-flask",
        courses: [
            { name: "B.Sc.", slug: "bsc" },
            { name: "M.Sc.", slug: "msc" },
            { name: "Distance B.Sc.", slug: "distance-bsc" },
            { name: "Distance M.Sc.", slug: "distance-msc" },
        ]
    },
    {
        name: "Architecture & Planning",
        slug: "architecture-planning",
        icon: "fas fa-building",
        courses: [
            { name: "B.Arch.", slug: "barch" },
            { name: "M.Arch.", slug: "march" },
            { name: "M.Plan", slug: "mplan" },
        ]
    },
    {
        name: "Accounting & Commerce",
        slug: "accounting-commerce",
        icon: "fas fa-calculator",
        courses: [
            { name: "B.Com.", slug: "bcom" },
            { name: "M.Com.", slug: "mcom" },
            { name: "CA", slug: "ca" },
            { name: "CS", slug: "cs" },
            { name: "Diploma in Accounting", slug: "diploma-accounting" },
            { name: "Diploma in Taxation", slug: "diploma-taxation" },
        ]
    },
    {
        name: "Teaching & Education",
        slug: "teaching-education",
        icon: "fas fa-chalkboard-teacher",
        courses: [
            { name: "B.Ed.", slug: "bed" },
            { name: "B.P.Ed.", slug: "bped" },
            { name: "B.Voc", slug: "bvoc" },
            { name: "M.Ed.", slug: "med" },
            { name: "M.P.Ed.", slug: "mped" },
            { name: "D.Ed.", slug: "ded" },
        ]
    },
];

// All cities in Karnataka
export const cities: string[] = [
    "Bangalore",
    "Mysore",
    "Mangalore",
    "Hubli",
    "Belgaum",
    "Gulbarga",
    "Dharwad",
    "Davanagere",
    "Shimoga",
    "Tumkur",
    "Bellary",
    "Bijapur",
    "Udupi",
    "Manipal",
    "Hassan",
    "Bidar",
    "Raichur",
    "Chikmagalur",
    "Mandya",
    "Kolar",
    "Bagalkot",
    "Gadag",
    "Chitradurga",
    "Haveri",
    "Koppal",
    "Chamarajnagar",
    "Kodagu",
    "Karwar",
    "Puttur",
    "Sirsi",
    "Belagavi",
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
    return courseCategories.find(cat => cat.slug === slug);
};

// Helper function to get course by slug
export const getCourseBySlug = (slug: string): { course: Course; category: Category } | undefined => {
    for (const category of courseCategories) {
        const course = category.courses.find(c => c.slug === slug);
        if (course) {
            return { course, category };
        }
    }
    return undefined;
};

// Get all courses flat
export const getAllCourses = (): { course: Course; category: Category }[] => {
    const result: { course: Course; category: Category }[] = [];
    for (const category of courseCategories) {
        for (const course of category.courses) {
            result.push({ course, category });
        }
    }
    return result;
};
