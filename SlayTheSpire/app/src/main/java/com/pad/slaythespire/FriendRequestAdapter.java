package com.pad.slaythespire;

import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class FriendRequestAdapter
        extends RecyclerView.Adapter<FriendRequestAdapter.ViewHolderFriendRequest>
        implements View.OnClickListener{

    private ArrayList<String> dataList;
    private View.OnClickListener listener;

    public FriendRequestAdapter(ArrayList<String> dataList) {
        Log.e("taffff", "holaaaaaaaa");
        this.dataList = dataList;
    }

    // enlaza el adaptador con la lista de items
    @NonNull
    @Override
    public ViewHolderFriendRequest onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.list_friend_requests,null,false);
        view.setOnClickListener(this);
        return new ViewHolderFriendRequest(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderFriendRequest holder, int position) {
        holder.assignData(dataList.get(position));

    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

    @Override
    public void onClick(View v) {
        if(listener!=null){
            listener.onClick(v);
        }
    }

    public void setOnClickListener(View.OnClickListener listener){
        this.listener = listener;
    }

    public class ViewHolderFriendRequest extends RecyclerView.ViewHolder {

        TextView textView;

        private CardView cardView;

        public ViewHolderFriendRequest(View itemView) {
            super(itemView);

            textView = itemView.findViewById(R.id.friend_request_text);
            //imageView = itemView.findViewById(R.id.card_template_image);
        }

        public void assignData(String s) {
            textView.setText(s);
        }
    }
}
