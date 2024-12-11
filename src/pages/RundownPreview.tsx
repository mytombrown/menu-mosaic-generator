import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getCodeThumbnail } from '../utils/thumbnailUtils';
import { ChevronLeft, Home } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface RundownItem {
  rundownId: string;
  name: string;
  data: Record<string, string[]>;
  duration?: string;
  status?: 'LIVE' | 'NEXT' | 'READY';
}

const RundownPreview = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<RundownItem[]>([]);

  useEffect(() => {
    const savedCodes = JSON.parse(localStorage.getItem("saved-codes") || "[]");
    const hotbarItems = savedCodes.map((code: any, index: number) => ({
      ...code,
      rundownId: `${Date.now()}-${Math.random()}`,
      duration: ['2:30', '1:45', '3:15', '2:00'][index % 4],
      status: index === 0 ? 'LIVE' : index === 1 ? 'NEXT' : 'READY'
    }));
    setItems(hotbarItems);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Header */}
      <div className="bg-[#141414] border-b border-[#2A2A2A] px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/codes")}
            className="hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/codes")}
            className="hover:bg-white/20"
          >
            <Home className="h-5 w-5 text-white" />
          </Button>
          <span className="font-semibold text-white">Broadcast Control</span>
          <span className="text-gray-400">00:15:23</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Preview */}
        <div className="col-span-1">
          <div className="bg-[#141414] rounded-lg p-4 h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium text-white">Preview</span>
            </div>
            <div className="bg-black h-full rounded"></div>
          </div>
        </div>

        {/* Program */}
        <div className="col-span-1">
          <div className="bg-[#141414] rounded-lg p-4 h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 bg-red-500 rounded-full"></span>
              <span className="text-sm font-medium text-white">Program</span>
            </div>
            <div className="bg-black h-full rounded"></div>
          </div>
        </div>
      </div>

      {/* Rundown List - Added mt-8 for more spacing */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="rundown">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="px-4 space-y-2 mt-8"
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.rundownId}
                  draggableId={item.rundownId}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`
                        bg-[#1E1E1E] rounded-lg p-4 flex items-center gap-4
                        ${item.status === 'LIVE' && 'border-l-4 border-red-500'}
                        ${item.status === 'NEXT' && 'border-l-4 border-yellow-500'}
                        ${item.status === 'READY' && 'border-l-4 border-green-500'}
                      `}
                    >
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded text-white
                        ${item.status === 'LIVE' && 'bg-red-500/20 text-red-500'}
                        ${item.status === 'NEXT' && 'bg-yellow-500/20 text-yellow-500'}
                        ${item.status === 'READY' && 'bg-green-500/20 text-green-500'}
                      `}>
                        {item.status}
                      </span>
                      <span className="flex-grow font-medium text-white">{item.name}</span>
                      <span className="text-gray-400">{item.duration}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                          <span className="sr-only">Copy</span>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                          <span className="sr-only">Audio</span>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                          <span className="sr-only">Settings</span>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default RundownPreview;
