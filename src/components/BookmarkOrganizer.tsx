import React, { useState } from "react";
import {parseInstruction} from "@/hooks/useOpenai";

const BookmarkOrganizer: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    organizeBookmarks(e.target.value);
  };

  // 创建文件夹：
  const createFolder = async (folderName: string) => {
    try {
      await new Promise((resolve) =>
        chrome.bookmarks.create({ title: folderName }, resolve)
      );
      console.log(`Created folder: ${folderName}`);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  // 删除文件夹：
  const deleteFolder = async (folderName: string) => {
    try {
      const bookmarks = await new Promise<chrome.bookmarks.BookmarkTreeNode[]>(
        (resolve) => chrome.bookmarks.getTree(resolve)
      );
      const folder = findFolder(bookmarks, folderName);

      if (folder) {
        await new Promise((resolve) =>
          chrome.bookmarks.removeTree(folder.id, resolve)
        );
        console.log(`Deleted folder: ${folderName}`);
      } else {
        console.log(`Folder not found: ${folderName}`);
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  // 移动书签：
  const moveBookmarks = async (sourceFolder: string, targetFolder: string) => {
    try {
      const bookmarks = await new Promise<chrome.bookmarks.BookmarkTreeNode[]>(
        (resolve) => chrome.bookmarks.getTree(resolve)
      );
      const source = findFolder(bookmarks, sourceFolder);
      const target = findFolder(bookmarks, targetFolder);

      if (source && target) {
        const children = await new Promise<chrome.bookmarks.BookmarkTreeNode[]>(
          (resolve) => chrome.bookmarks.getChildren(source.id, resolve)
        );

        for (const child of children) {
          await new Promise((resolve) =>
            chrome.bookmarks.move(child.id, { parentId: target.id }, resolve)
          );
        }

        console.log(`Moved bookmarks from ${sourceFolder} to ${targetFolder}`);
      } else {
        console.log("Source or target folder not found.");
      }
    } catch (error) {
      console.error("Error moving bookmarks:", error);
    }
  };

  // 查找文件夹的辅助函数 findFolder：
  const findFolder = (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[],
    folderName: string
  ): chrome.bookmarks.BookmarkTreeNode | null => {
    for (const bookmark of bookmarks) {
      if (bookmark.title === folderName && bookmark.children) {
        return bookmark;
      }

      if (bookmark.children) {
        const found = findFolder(bookmark.children, folderName);
        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  const findBookmarksByTag = (
    bookmarks: chrome.bookmarks.BookmarkTreeNode[],
    tag: string
  ): chrome.bookmarks.BookmarkTreeNode[] => {
    const matchedBookmarks: chrome.bookmarks.BookmarkTreeNode[] = [];

    for (const bookmark of bookmarks) {
      if (!bookmark.children && bookmark.url && bookmark.title.includes(tag)) {
        matchedBookmarks.push(bookmark);
      }

      if (bookmark.children) {
        matchedBookmarks.push(...findBookmarksByTag(bookmark.children, tag));
      }
    }

    return matchedBookmarks;
  };


  const classifyBookmarks = async (folderName: string, tags: string[]) => {
    try {
      // 创建分类文件夹
      for (const tag of tags) {
        await createFolder(`${folderName}/${tag}`);
      }

      // 获取所有书签
      const bookmarks = await new Promise<chrome.bookmarks.BookmarkTreeNode[]>(
        (resolve) => chrome.bookmarks.getTree(resolve)
      );

      // 寻找与标签匹配的书签并移动到相应文件夹
      for (const tag of tags) {
        const matchedBookmarks = findBookmarksByTag(bookmarks, tag);

        for (const bookmark of matchedBookmarks) {
          const targetFolder = findFolder(bookmarks, `${folderName}/${tag}`);
          if (targetFolder) {
            await new Promise((resolve) =>
              chrome.bookmarks.move(bookmark.id, { parentId: targetFolder.id }, resolve)
            );
          }
        }
      }

      console.log(`Classified bookmarks in folder: ${folderName}`);
    } catch (error) {
      console.error("Error classifying bookmarks:", error);
    }
  };



        const organizeBookmarks = async (text: string) => {
    // 在这里实现处理书签的逻辑
    try {
      const instruction = await parseInstruction(text);
      if (!instruction) {
        console.log("Unable to parse instruction.");
        return;
      }

      const { action, folderName } = instruction;

      switch (action) {
        case "create":
          await createFolder(folderName);
          break;
        case "delete":
          await deleteFolder(folderName);
          break;
        case "move":
          // 如果要实现移动书签，需要提供源文件夹和目标文件夹
          const { sourceFolder, targetFolder } = JSON.parse(text);
          await moveBookmarks(sourceFolder, targetFolder);
          break;
        default:
          console.log("Invalid action.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to organize bookmarks..."
      />
    </div>
  );
};

export default BookmarkOrganizer;
