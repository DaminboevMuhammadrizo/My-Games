import { Download, Smartphone, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { useState } from 'react';

interface GameCardProps {
    id: string;
    name: Record<Language, string>;
    description: Record<Language, string>;
    image: string;
    fileAndroid: string;
    fileIos: string;
}

export const GameCard = ({ name, description, image, fileAndroid, fileIos }: GameCardProps) => {
    const { language, t } = useLanguage();
    const [open, setOpen] = useState(false);



    const handleDownload = (platform: 'android' | 'ios') => {
        if (platform === 'ios') {
            if (language === 'uz') toast.error('Hozircha iOS versiyasi mavjud emas');
            else if (language === 'ru') toast.error('Версия для iOS пока недоступна');
            else toast.error('iOS version is not available yet');
            setOpen(false);
            return;
        }

        // AVTOMATIK GitHub link
        const downloadUrl = getGitHubDownloadUrl(fileAndroid);
        window.open(downloadUrl, '_blank');

        if (language === 'uz') toast.success('Yuklab olish boshlandi...');
        else if (language === 'ru') toast.success('Загрузка началась...');
        else toast.success('Download started...');

        setOpen(false);
    };

    const getGitHubDownloadUrl = (filename: string) => {
        const repoOwner = 'DaminboevMuhammadrizo';
        const repoName = 'My-Games';

        // Eng so'nggi release ni olish (version raqamini bilish shart emas)
        return `https://github.com/${repoOwner}/${repoName}/releases/latest/download/${filename}`;
    }


    return (
        <Card className="card-gaming overflow-hidden group">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={`/assets/${image}`}
                    alt={name[language]}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <CardHeader>
                <CardTitle className="text-gradient-gaming">{name[language]}</CardTitle>
                <CardDescription className="line-clamp-2">{description[language]}</CardDescription>
            </CardHeader>

            <CardFooter>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="w-full gap-2 bg-gradient-to-r from-gaming-cyan to-gaming-purple hover:shadow-lg hover:shadow-gaming-cyan/50 transition-all duration-300"
                        >
                            <Download className="h-4 w-4" />
                            {t('download')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{t('choosePlatform')}</DialogTitle>
                            <DialogDescription>
                                {name[language]}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <Button
                                onClick={() => handleDownload('android')}
                                className="gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                            >
                                <Smartphone className="h-5 w-5" />
                                {t('android')}
                            </Button>
                            <Button
                                onClick={() => handleDownload('ios')}
                                className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                                disabled={!fileIos}
                            >
                                <Apple className="h-5 w-5" />
                                {t('ios')}
                                {!fileIos && (
                                    <span className="text-xs ml-1 opacity-75">
                                        {language === 'uz' ? '(Tez kunda)' :
                                            language === 'ru' ? '(Скоро)' :
                                                '(Coming Soon)'}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};
