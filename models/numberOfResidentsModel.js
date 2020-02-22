require('dotenv').config();
const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
    male: {
        main_course: {
            grade_1: {
                class_1: Number,
                class_2: Number,
                class_3: Number,
                class_4: Number,
                class_5: Number,
                total: Number
            },
            grade_2: {
                class_s_m: Number,
                class_s_e: Number,
                class_s_j: Number,
                class_c: Number,
                class_z: Number,
                total: Number
            },
            grade_3: {
                class_s_m: {
                    domestic: Number,
                    international: Number
                },
                class_s_e: {
                    domestic: Number,
                    international: Number
                },
                class_s_j: {
                    domestic: Number,
                    international: Number
                },
                class_c: {
                    domestic: Number,
                    international: Number
                },
                class_z: {
                    domestic: Number,
                    international: Number
                },
                total: Number
            },
            grade_4: {
                class_s_m: {
                    domestic: Number,
                    international: Number
                },
                class_s_e: {
                    domestic: Number,
                    international: Number
                },
                class_s_j: {
                    domestic: Number,
                    international: Number
                },
                class_c: {
                    domestic: Number,
                    international: Number
                },
                class_z: {
                    domestic: Number,
                    international: Number
                },
                total: Number
            },
            grade_5: {
                class_s_m: {
                    domestic: Number,
                    international: Number
                },
                class_s_e: {
                    domestic: Number,
                    international: Number
                },
                class_s_j: {
                    domestic: Number,
                    international: Number
                },
                class_c: {
                    domestic: Number,
                    international: Number
                },
                class_z: {
                    domestic: Number,
                    international: Number
                },
                total: Number
            },
            domestic_total: Number,
            international_total: Number,
            main_course_total: Number
        },
        advanced_course: {
            grade_1: Number,
            grade_2: Number,
            total: Number
        },
        total: Number
    },
    female: {
        main_course: {
            grade_1: {
                class_1: Number,
                class_2: Number,
                class_3: Number,
                class_4: Number,
                class_5: Number,
                total: Number
            },
            grade_2: {
                class_s_m: Number,
                class_s_e: Number,
                class_s_j: Number,
                class_c: Number,
                class_z: Number,
                total: Number
            },
            grade_3: {
                class_s_m: {
                    domestic: Number,
                    international: Number
                },
                class_s_e: {
                    domestic: Number,
                    international: Number
                },
                class_s_j: {
                    domestic: Number,
                    international: Number
                },
                class_c: {
                    domestic: Number,
                    international: Number
                },
                class_z: {
                    domestic: Number,
                    international: Number
                },
                total: Number
            },
            grade_4: {
                class_s_m: {
                    domestic: Number,
                    international: Number
                },
                class_s_e: {
                    domestic: Number,
                    international: Number
                },
                class_s_j: {
                    domestic: Number,
                    international: Number
                },
                class_c: {
                    domestic: Number,
                    international: Number
                },
                class_z: {
                    domestic: Number,
                    international: Number
                },
                total: Number
            },
            grade_5: {
                class_s_m: {
                    domestic: Number,
                    international: Number
                },
                class_s_e: {
                    domestic: Number,
                    international: Number
                },
                class_s_j: {
                    domestic: Number,
                    international: Number
                },
                class_c: {
                    domestic: Number,
                    international: Number
                },
                class_z: {
                    domestic: Number,
                    international: Number
                },
                total: Number
            },
            domestic_total: Number,
            international_total: Number,
            main_course_total: Number
        },
        advanced_course: {
            grade_1: Number,
            grade_2: Number,
            total: Number
        },
        total: Number
    }
});

exports.numberOfResidents = mongoose.model('numberOfResidents', numberSchema);