import {
  CourseSection,
  NewCourseSectionData,
  ResponseSchema,
  Response,
  CourseSectionSchema,
} from "@/types/CourseSection";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import ApiService from "@/core/services/ApiService";
import { nullType, number, safeParse } from "valibot";
import { red } from "console-log-colors";

class CoursesService {
  public static async getCourseSections(courseId: string) {
    const res = await ApiService.get<Response>(
      `${AppConstants.SECTIONS_URL}/SectionByCourseId/${courseId}`
    );
    return res.data.data;
  }
  public static async getGradeTypeByCourseId(courseId: string) {
    const res = await ApiService.query<{ data: number }>(
      `${AppConstants.SECTIONS_URL}/GetGradeType`,
      {
        params: {
          courseId,
        },
      }
    );
    const validation = safeParse(number(), res.data.data);
    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async getGradeTypeBySectionId(sectionId: string) {
    const res = await ApiService.query<{ data: number }>(
      `${AppConstants.SECTIONS_URL}/GetGradeType`,
      {
        params: {
          sectionId,
        },
      }
    );
    const validation = safeParse(number(), res.data.data);
    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async deleteCourseSection(sectionId: string) {
    const res = await ApiService.delete<{ data: null }>(
      `${AppConstants.SECTIONS_URL}/${sectionId}`
    );

    const validation = safeParse(nullType(), res.data.data);

    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async updateCourseSection(
    itemId: string,
    data: NewCourseSectionData
  ) {
    const res = await ApiService.put<{ data: CourseSection }>(
      `${AppConstants.SECTIONS_URL}/${itemId}`,
      {
        ...data,
      }
    );
    const validation = safeParse(CourseSectionSchema, res.data.data);

    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async createSection(
    courseId: string,
    data: NewCourseSectionData
  ) {
    const res = await ApiService.post<{ data: CourseSection }>(
      `${AppConstants.SECTIONS_URL}/${courseId}`,
      { ...data }
    );

    const validation = safeParse(CourseSectionSchema, res.data.data);

    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
}

export default CoursesService;
