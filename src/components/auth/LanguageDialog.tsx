
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChinese: () => void;
  onSelectEnglish: () => void;
}

const LanguageDialog = ({ isOpen, onClose, onSelectChinese, onSelectEnglish }: LanguageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Selection | 语言选择
          </DialogTitle>
          <DialogDescription>
            Would you like to switch the interface to Chinese?
            <br />
            是否将界面翻译成中文？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
          <Button 
            variant="default" 
            className="w-full sm:w-auto" 
            onClick={onSelectChinese}
          >
            是 (Yes)
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={onSelectEnglish}
          >
            否 (No)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageDialog;
