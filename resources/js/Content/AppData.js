import levels from "~/appData/levels.json";
import chapters from "~/appData/chapters.json";
import {glossaryWords, glossaryWordsGroups} from "~/appData/glossaryWords.json";
import courses from "~/appData/courses.json";


const coursesIds = [1]

const getCourseFromId = (courseId) => composeCourse(courses[courseId], courseId)

const composeCourse = (courseRow, id) => {
    return {
        ...courseRow,
        id,
        levels: courseRow.levels.map(levelId => getLevelFromId(levelId))
    }
}

const getLevelFromId = (levelId) => composeLevel(levels[levelId], levelId)

const composeLevel = (levelRow, id) => {
    return {
        ...levelRow,
        id,
        chapters : levelRow.chapters.map(chapterId => getChapterFromId(chapterId)),
    }
}

const getChapterFromId = (chapterId) => composeChapter(chapters[chapterId], chapterId)

const composeChapter = (chapterRow, id) => {
    return {
        ...chapterRow,
        id,
    }
}

const getGlossaryGroupFromId = (glossaryGroupId) => composeGlossaryGroup(glossaryWordsGroups[glossaryGroupId], glossaryGroupId)

const composeGlossaryGroup = (glossaryGroupRow, id) => {
    return {
        ...glossaryGroupRow,
        id,
        items : glossaryGroupRow.items.map(wordId => getGlossaryWordFromId(wordId))
    }
}

const getGlossaryWordFromId = (wordId) => (
    {
        ...glossaryWords[wordId],
        id : wordId
    })

export const AppData = {
    courses : coursesIds.map(courses => getCourseFromId(courses)),
    glossary : Object.keys(glossaryWordsGroups).map(key => getGlossaryGroupFromId(parseInt(key))),
}
