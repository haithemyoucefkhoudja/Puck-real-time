import { DefaultRootProps, DropZone, type Config } from "@measured/puck";
import { ReactNode } from "react";
import BoxModelComponent from "./components/BoxModelComponent";
import { ClassNameProvider } from "./providers/classNameProvider";
import { CssWorkers } from "./lib/CssWorker";

type Props = {
  Block:{
    worker:CssWorkers,
  };
};

interface DispatcherProps {
  className?: string;
  content?:ReactNode | string | number;
  tag: keyof JSX.IntrinsicElements
}


const Dispatcher: React.FC<DispatcherProps> = ({ tag, className, content }) => {
  const Tag = tag;
  switch (tag) {
    case 'div':
    case 'section':
      return (
        <Tag className={className}>
          <DropZone zone="my-content" />
        </Tag>
      );
    default:
      return (
        <Tag className={className}>
          {content}
        </Tag>
      );
  }
};
const config:Config<Props, DefaultRootProps, 'Layout' | 'Elements'> = {
  
  categories: {
    Layout: {
      components: ["Block"],
      title: "Text",
      defaultExpanded: false, 
    },
    Elements: {
      components: ["Block"],
    },
  },
  components:{
    Block:{
      fields:{
        worker: {
          type: "custom",
          render: ({ name, onChange, value, }) => {
            return (<ClassNameProvider  onChange={onChange} value={value}>
              <BoxModelComponent />
            </ClassNameProvider>);
          }
        }
      },
      render:(props)=>{
        const worker = props.worker;
        
        if(worker) {
          return <h1  {...worker}>hello</h1>
        }
      }
    },
    }
}


export default config;
