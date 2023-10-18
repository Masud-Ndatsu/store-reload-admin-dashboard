import React, { useState } from "react";

interface Iprops {
     tags: string[];
     setTags: React.Dispatch<React.SetStateAction<string[] | never[]>>;
}

export const ProductTag = React.memo(({ tags, setTags }: Iprops) => {
     const [currentTag, setCurrentTag] = useState<string>("");

     const handleTagChange = (event: any): void => {
          setCurrentTag(event.target.value);
     };

     const handleTagAdd = () => {
          if (currentTag.trim() !== "") {
               setTags([...tags, currentTag.trim()]);
               setCurrentTag("");
          }
     };

     const handleTagRemove = (tagToRemove: string) => {
          const updatedTags = React.useMemo(
               () => tags.filter((tag: string) => tag !== tagToRemove),
               []
          );
          setTags(updatedTags);
     };
     return (
          <div className="tag-input-container">
               <div
                    className="tag-list"
                    style={{
                         padding: "1rem 0",
                         display: "flex",
                         gap: "1.5rem",
                         width: "100%",
                    }}
               >
                    {tags.map(
                         (tag: string, index: number): React.ReactNode => (
                              <div
                                   key={index.toString()}
                                   className="tag"
                                   style={{
                                        backgroundColor: "var(--main-blue)",
                                        color: "white",
                                        padding: ".25rem .5rem",
                                        position: "relative",
                                   }}
                              >
                                   <span>{tag}</span>
                                   <span
                                        onClick={() => handleTagRemove(tag)}
                                        style={{
                                             position: "absolute",
                                             top: "-.5rem",
                                             right: "-1rem",
                                             color: "#444",
                                             fontSize: "12px",
                                             padding: "0.102rem 0.25rem",
                                             cursor: "pointer",
                                        }}
                                   >
                                        x
                                   </span>
                              </div>
                         )
                    )}
               </div>
               <div className="tag-input">
                    <label htmlFor="tag">Product Tags</label>
                    <input
                         type="text"
                         placeholder="Add a tag"
                         value={currentTag}
                         onChange={handleTagChange}
                         onKeyDown={(
                              e: React.KeyboardEvent<HTMLInputElement>
                         ) => {
                              if (e.key === "Enter") {
                                   e.preventDefault();
                                   handleTagAdd();
                              }
                         }}
                    />
                    <button type="button" onClick={handleTagAdd}>
                         Add
                    </button>
               </div>
          </div>
     );
});
