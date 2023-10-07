import {defineStore} from "pinia";
import {Course, CourseFilters, NewCourseData} from "@/types/Courses";

import coursesService from "@/core/repositories/CoursesService";
import {
    CourseSelection,
    GetPackagesResponseDto,
    Package,
    PackageAddData,
    PackageFilter,
    PackageStatus, PackageUpdateData,
    SelectCoursesDto
} from "@/types/Packages/Packages";
import PackagesService from "@/core/services/PackagesService";
import {PagedResult} from "@/types/ApiResponse";
import toaster from "@/core/services/Toaster";
import {useLocalStorage} from "@vueuse/core/index";
import {LogLevel} from "@aspnet/signalr";
import {array} from "yup";


export const useCoursesStore = defineStore({
    id: "coursesStore",
    state: () => {
        return ({
            courses: [] as Course[],
            pagination: {
                total: 0,
                currentPage: 1,
                currentSize: 0,
            },
            searchValue: "",

            isSwitchingCourseStatus: false,

            selectedCourse: null as Course | null,
            dataIsLoading: false,
            isCreatingNewItem: false,
            isUpdatingItem: false,
            isDeletingItem: false,

            errorMessage: "",
            errorLoadingData: false,


            //// packages
            selectedCoursesForPackage: [] as CourseSelection[],
            coursesToSelectToAddToPackage: [] as CourseSelection[],
            packages: {} as PagedResult<GetPackagesResponseDto>,
            selectedPackage: useLocalStorage<GetPackagesResponseDto>("selectedPackage", {}),
            selectedGradeId: useLocalStorage<string>("selectedGradeId", ''),
            selectedPackageState: PackageStatus.Active as PackageStatus,


        });
    },

    actions: {
        async loadCourses(params: CourseFilters) {
            this.dataIsLoading = true;
            this.errorLoadingData = false;

            try {
                const items = await coursesService.getCourses(params);

                this.courses = items;
            } catch (e) {
                console.log((e as Error).message);
            } finally {
                this.dataIsLoading = false;
            }
        },
        unselectCourse() {
            this.selectedCourse = null;
        },
        selectCourse(selectedCourse: Course) {
            this.selectedCourse = selectedCourse;
        },
        async updateItem(newValues: NewCourseData) {
            this.isUpdatingItem = true;
            try {
                if (!this.selectedCourse) {
                    throw Error("no selected course");
                }

                const index = this.courses.findIndex(
                    (course) => course.id === this.selectedCourse!.id
                );

                await coursesService.updateCourse(this.selectedCourse.id, newValues);

                this.courses[index] = {...this.selectedCourse, ...newValues};
                this.isUpdatingItem = false;
            } catch (error) {
                this.isUpdatingItem = false;
                console.log(error);
            }
        },
        async createNewItem(courseData: NewCourseData) {
            this.isCreatingNewItem = true;
            try {
                const res = await coursesService.createCourse(courseData);
                this.courses.push(res.data.data);
                this.isCreatingNewItem = false;
            } catch (error) {
                this.isCreatingNewItem = false;
                console.log(error);
            }
        },
        async deleteItem() {
            this.isDeletingItem = true;

            if (!this.selectedCourse) {
                console.error("no course selected");
                return;
            }

            try {
                await coursesService.deleteCourse(this.selectedCourse.id);
                this.courses = this.courses.filter(
                    (item) => item.id !== this.selectedCourse?.id
                );
                this.unselectCourse();
            } catch (error) {
                console.log(error);
            } finally {
                this.isDeletingItem = false;
            }
        },







        //////////////////////Packages



        async loadCoursesToAddToPackage(courseName: string) {


            const result = await PackagesService.getCoursesForPackageSelection(courseName, this.selectedGradeId)
            this.coursesToSelectToAddToPackage = result.data

        },
        async unselectCourseForPackage(id: string) {
            this.selectedCoursesForPackage = this.selectedCoursesForPackage.filter(x => x.id != id);
        },
        async createPackage(data: PackageAddData) {
            this.dataIsLoading = true;
            try {

                console.log(data)

                const formData = new FormData();
                for (let newGradeSubjectDataKey in data) {
                    console.log(newGradeSubjectDataKey)
                    if (!Array.isArray(data[newGradeSubjectDataKey]))//newGradeSubjectDataKey !== "courseIds"
                        formData.append(newGradeSubjectDataKey, data[newGradeSubjectDataKey] as Blob);
                    else {
                        data[newGradeSubjectDataKey].forEach(d => {
                            formData.append(newGradeSubjectDataKey, d)
                        })
                    }
                }

                const result = await PackagesService.createPackage(formData);
                toaster.Success("created successfully");
            } catch (error) {
                console.log(error)
            } finally {
                this.dataIsLoading = false;
            }
        },
        async loadPackages(params: PackageFilter) {
            this.dataIsLoading = true;
            this.errorLoadingData = false;
            try {
                const result = await PackagesService.getPackages(params)
                this.packages = result;
            } catch (e) {
                console.log((e as Error).message);
                this.packages = []
            } finally {
                this.dataIsLoading = false;
            }
        },
        getPackageById(id: string) {

            return this.packages.results.find(x => x.id == id)

        },
        selectPackage(packageRow: GetPackagesResponseDto) {
            this.selectedPackage = packageRow
        },
        unSelectPackage(packageRow: GetPackagesResponseDto) {
            this.selectedPackage = null
        },
        async updatePackage(packageUpdate: PackageUpdateData) {
            this.dataIsLoading = true;
            try {

                const formData = new FormData();
                for (let newGradeSubjectDataKey in packageUpdate) {
                    console.log(newGradeSubjectDataKey)
                    console.log(packageUpdate[newGradeSubjectDataKey])
                    formData.append(newGradeSubjectDataKey, packageUpdate[newGradeSubjectDataKey] as Blob);
                }

                await PackagesService.updatePackage(formData);

                toaster.Success("updated successfully");
            } catch (error) {
                console.log(error)
            } finally {
                this.dataIsLoading = false;
            }
        },
        async deletePackage() {
            this.dataIsLoading = true;
            this.isDeletingItem = true;
            try {

                console.log('=============== in the module')
                console.log(this.selectedPackage)
                await PackagesService.deletePackage(this.selectedPackage?.id)
                toaster.Success("deleted successfully");
            } catch (error) {
                console.log(error)
            } finally {
                this.dataIsLoading = false;
                this.isDeletingItem = false;
            }

        },
        async removeCourseFromPackage(course: CourseSelection) {
            try {

                const request = {
                    packageId: this.selectedPackage.id,
                    courseIds: [course.id]
                }

                await PackagesService.removeCourseFromPackage(request)
                this.selectedCoursesForPackage.filter(x => x.id != course.id)

                toaster.Success("Course remvoed Successfully")

                await this.coursesStore.getCoursesByPackageId(this.selectedPackage)

            } catch (error) {

                console.log(error)
            } finally {

            }
        },

        async addCourseToPackage(course: CourseSelection[]) {
            try {

                const request = {
                    packageId: this.selectedPackage.id,
                    courseIds: [...course.map(x => x.id)]
                }

                console.log(request)

                await PackagesService.addCoursesToPackage(request)
                toaster.Success("Courses Added Successfully")

                await this.coursesStore.getCoursesByPackageId(this.selectedPackage)


            } catch (error) {

                console.log(error)
            } finally {

            }
        },
        async getCoursesByPackageId(selectedCourse: GetPackagesResponseDto) {
            try {
                const result = await PackagesService.getPackageById(selectedCourse)
                if (result.length > 0)
                    this.selectPackage(result[0]);
                else
                    this.selectPackage({});
            } catch (error) {
                console.log(error)
            }
        },
        async changePackageActiveState(packageId: string){

            try {

                await PackagesService.changeActiveState(packageId)
                toaster.Success("state changed successfully")
            }catch (e){
                console.log(e)
            }
        },
    },
});

const dummyData: Package[] = [
    {
        id: "1",
        title: "Package 1",
        englishTitle: "Package 1 (English)",
        description: "Description for Package 1",
        englishDescription: "English Description for Package 1",
        gradeSubjectId: "grade1",
        price: 9.99,
        logoPath: "/images/package1.png",
        packageStatus: "active",
        courses: [],
        packageType: "basic",
        createdAt: "2023-10-01",
        lastUpdated: "2023-10-01",
    },
    // Add more dummy data entries...
    {
        id: "2",
        title: "Package 2",
        englishTitle: "Package 2 (English)",
        description: "Description for Package 2",
        englishDescription: "English Description for Package 2",
        gradeSubjectId: "grade2",
        price: 19.99,
        logoPath: "/images/package2.png",
        packageStatus: "inactive",
        courses: [],
        packageType: "premium",
        createdAt: "2023-10-02",
        lastUpdated: "2023-10-03",
    },
    {
        id: "3",
        title: "Package 3",
        englishTitle: "Package 3 (English)",
        description: "Description for Package 3",
        englishDescription: "English Description for Package 3",
        gradeSubjectId: "grade3",
        price: 14.99,
        logoPath: "/images/package3.png",
        packageStatus: "active",
        courses: [],
        packageType: "basic",
        createdAt: "2023-10-04",
        lastUpdated: "2023-10-04",
    },
    {
        id: "4",
        title: "Package 4",
        englishTitle: "Package 4 (English)",
        description: "Description for Package 4",
        englishDescription: "English Description for Package 4",
        gradeSubjectId: "grade4",
        price: 24.99,
        logoPath: "/images/package4.png",
        packageStatus: "active",
        courses: [],
        packageType: "premium",
        createdAt: "2023-10-05",
        lastUpdated: "2023-10-05",
    },
    {
        id: "5",
        title: "Package 5",
        englishTitle: "Package 5 (English)",
        description: "Description for Package 5",
        englishDescription: "English Description for Package 5",
        gradeSubjectId: "grade5",
        price: 12.99,
        logoPath: "/images/package5.png",
        packageStatus: "inactive",
        courses: [],
        packageType: "basic",
        createdAt: "2023-10-06",
        lastUpdated: "2023-10-06",
    },
    // Add more dummy data entries...
];


const tableData: SelectCoursesDto[] = [
    {
        id: "id1",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-03',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "id1",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-04',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "2",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-01',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "3",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "4",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "5",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "6",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "7",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "8",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "9",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-06',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "10",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-07',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
]




