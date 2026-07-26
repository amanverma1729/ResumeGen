import React from "react";
import { useResume } from "../Context";
import TemplateModern from "./Templates/TemplateModern";
import TemplateProfessional from "./Templates/TemplateProfessional";
import TemplateATSClassic from "./Templates/TemplateATSClassic";
import TemplateATSModern from "./Templates/TemplateATSModern";
import TemplateATSCompact from "./Templates/TemplateATSCompact";
import TemplateATSProfessional from "./Templates/TemplateATSProfessional";
import TemplateATSDeveloper from "./Templates/TemplateATSDeveloper";
import TemplateSplitModern from "./Templates/TemplateSplitModern";
import TemplateSplitCreative from "./Templates/TemplateSplitCreative";
import TemplateSplitProfessional from "./Templates/TemplateSplitProfessional";

const ResumePreview = () => {
    const { template, printElem } = useResume();
    
    const renderTemplate = () => {
        switch(template) {
            case 'professional': return <TemplateProfessional />;
            case 'ats-classic': return <TemplateATSClassic />;
            case 'ats-modern': return <TemplateATSModern />;
            case 'ats-compact': return <TemplateATSCompact />;
            case 'ats-professional': return <TemplateATSProfessional />;
            case 'ats-developer': return <TemplateATSDeveloper />;
            case 'split-modern': return <TemplateSplitModern />;
            case 'split-creative': return <TemplateSplitCreative />;
            case 'split-professional': return <TemplateSplitProfessional />;
            case 'modern':
            default:
                return <TemplateModern />;
        }
    };
    
    return (
        <div ref={printElem} className="w-[794px] h-[1123px] print:w-full print:h-full bg-white print:bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] print:shadow-none mx-auto overflow-hidden">
            {renderTemplate()}
        </div>
    );
};

export default ResumePreview;
