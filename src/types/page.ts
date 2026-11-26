export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

interface EducationEntry {
    institution: string;
    role: string;
    dates: string;
    location: string;
    supervisor: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
    education?: EducationEntry[];
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}
