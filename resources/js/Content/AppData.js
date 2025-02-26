import {levelsMap} from "@/Content/levels.js";
import {chaptersMap} from "@/Content/chapters.js";
import {glossaryWordsMap, glossaryWordsGroupsMap} from "@/Content/glossaryWords.js";
import {coursesMap} from "@/Content/courses.js";


const coursesIds = [1]

const getCourseFromId = (courseId) => composeCourse(coursesMap[courseId], courseId)

const composeCourse = (courseRow, id) => {
    return {
        ...courseRow,
        id,
        levels: courseRow.levels.map(levelId => getLevelFromId(levelId))
    }
}

const getLevelFromId = (levelId) => composeLevel(levelsMap[levelId], levelId)

const composeLevel = (levelRow, id) => {
    return {
        ...levelRow,
        id,
        chapters : levelRow.chapters.map(chapterId => getChapterFromId(chapterId)),
    }
}

const getChapterFromId = (chapterId) => composeChapter(chaptersMap[chapterId], chapterId)

const composeChapter = (chapterRow, id) => {
    return {
        ...chapterRow,
        id,
    }
}

const getGlossaryGroupFromId = (glossaryGroupId) => composeGlossaryGroup(glossaryWordsGroupsMap[glossaryGroupId], glossaryGroupId)

const composeGlossaryGroup = (glossaryGroupRow, id) => {
    return {
        ...glossaryGroupRow,
        id,
        items : glossaryGroupRow.items.map(wordId => getGlossaryWordFromId(wordId))
    }
}

const getGlossaryWordFromId = (wordId) => (
    {
        ...glossaryWordsMap[wordId],
        id : wordId
    })

export const AppData = {
    courses : coursesIds.map(courses => getCourseFromId(courses)),
    glossary : Object.keys(glossaryWordsGroupsMap).map(key => getGlossaryGroupFromId(parseInt(key))),
}
